/**
 * Storage System untuk Aplikasi Absensi OSIS
 * Menggunakan localStorage browser untuk penyimpanan data
 */

const Storage = {
  // Key constants
  KEYS: {
    MEMBERS: 'absensi_members',
    ACCESS_CODES: 'absensi_access_codes',
    ATTENDANCE: 'absensi_attendance',
    ADMIN_PASSWORD: 'absensi_admin_password',
    OSIS_STRUCTURE: 'absensi_osis_structure'
  },

  // ==================== INITIALIZATION ====================
  init() {
    // Initialize dengan data default jika kosong
    if (!this.getData(this.KEYS.MEMBERS)) {
      this.setData(this.KEYS.MEMBERS, []);
    }
    if (!this.getData(this.KEYS.ACCESS_CODES)) {
      this.setData(this.KEYS.ACCESS_CODES, []);
    }
    if (!this.getData(this.KEYS.ATTENDANCE)) {
      this.setData(this.KEYS.ATTENDANCE, []);
    }
    if (!this.getData(this.KEYS.ADMIN_PASSWORD)) {
      this.setData(this.KEYS.ADMIN_PASSWORD, 'admin123');
    }
  },

  // ==================== GENERIC STORAGE ====================
  getData(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error reading from storage:', error);
      return null;
    }
  },

  setData(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error writing to storage:', error);
      return false;
    }
  },

  // ==================== MEMBERS ====================
  getAllMembers() {
    return this.getData(this.KEYS.MEMBERS) || [];
  },

  addMember(name, position = '') {
    const members = this.getAllMembers();
    
    // Check if name already exists
    if (members.find(m => m.name.toLowerCase() === name.toLowerCase())) {
      throw new Error('Nama anggota sudah terdaftar!');
    }

    const newMember = {
      id: Date.now(),
      name: name.trim(),
      position: position.trim(),
      createdAt: new Date().toISOString()
    };

    members.push(newMember);
    this.setData(this.KEYS.MEMBERS, members);
    return newMember;
  },

  getMemberById(id) {
    const members = this.getAllMembers();
    return members.find(m => m.id === parseInt(id));
  },

  deleteMember(id) {
    let members = this.getAllMembers();
    const beforeLength = members.length;
    members = members.filter(m => m.id !== parseInt(id));
    
    if (members.length < beforeLength) {
      this.setData(this.KEYS.MEMBERS, members);
      return true;
    }
    return false;
  },

  // ==================== ACCESS CODES ====================
  setAccessCode(code, date) {
    const codes = this.getData(this.KEYS.ACCESS_CODES) || [];
    
    // Remove existing code for this date if exists
    const filtered = codes.filter(c => c.date !== date);
    
    filtered.push({
      code: code.trim(),
      date: date,
      createdAt: new Date().toISOString()
    });

    this.setData(this.KEYS.ACCESS_CODES, filtered);
    return true;
  },

  getAccessCode(date) {
    const codes = this.getData(this.KEYS.ACCESS_CODES) || [];
    const entry = codes.find(c => c.date === date);
    return entry ? entry.code : null;
  },

  // ==================== ATTENDANCE ====================
  recordAttendance(memberId, date, status) {
    let attendance = this.getData(this.KEYS.ATTENDANCE) || [];
    
    // Remove existing record for this member on this date
    attendance = attendance.filter(a => !(a.memberId === parseInt(memberId) && a.date === date));
    
    const now = new Date();
    const checkInTime = now.toISOString();
    const hour = now.getHours();
    const minute = now.getMinutes();
    
    // Auto-determine status if after 07:00
    let finalStatus = status;
    if (hour > 7 || (hour === 7 && minute > 0)) {
      finalStatus = 'telat';
    }
    
    attendance.push({
      memberId: parseInt(memberId),
      date: date,
      status: finalStatus,
      timeCheckIn: checkInTime
    });

    this.setData(this.KEYS.ATTENDANCE, attendance);
    return true;
  },

  // Auto-mark tidak hadir untuk yang belum absen jam 09:00
  autoMarkAbsentees(date = null) {
    const targetDate = date || new Date().toISOString().split('T')[0];
    const attendance = this.getData(this.KEYS.ATTENDANCE) || [];
    const members = this.getAllMembers();
    
    const attendanceMap = {};
    attendance.forEach(a => {
      if (a.date === targetDate) {
        attendanceMap[a.memberId] = true;
      }
    });
    
    // Mark members yang belum absen sebagai "tidak hadir"
    members.forEach(member => {
      if (!attendanceMap[member.id]) {
        attendance.push({
          memberId: member.id,
          date: targetDate,
          status: 'tidak hadir',
          timeCheckIn: new Date().toISOString(),
          isAutoMarked: true
        });
      }
    });
    
    this.setData(this.KEYS.ATTENDANCE, attendance);
    return true;
  },

  getAttendanceByDate(date) {
    const attendance = this.getData(this.KEYS.ATTENDANCE) || [];
    const members = this.getAllMembers();

    // Get attendance records for the date
    const dateRecords = attendance.filter(a => a.date === date);

    // Merge with members to show all members
    return members.map(member => {
      const record = dateRecords.find(a => a.memberId === member.id);
      return {
        ...member,
        status: record ? record.status : null,
        timeCheckIn: record ? record.timeCheckIn : null,
        isAutoMarked: record ? record.isAutoMarked : false
      };
    });
  },

  // Get attendance as object keyed by memberId for admin edit page
  getAttendanceByDateAsObject(date) {
    const attendance = this.getData(this.KEYS.ATTENDANCE) || [];
    const dateRecords = attendance.filter(a => a.date === date);
    
    const result = {};
    dateRecords.forEach(record => {
      result[record.memberId] = record;
    });
    return result;
  },

  getAttendanceSummary(startDate, endDate) {
    const attendance = this.getData(this.KEYS.ATTENDANCE) || [];
    const members = this.getAllMembers();

    return members.map(member => {
      const memberRecords = attendance.filter(a => 
        a.memberId === member.id && 
        a.date >= startDate && 
        a.date <= endDate
      );

      const hadir = memberRecords.filter(a => a.status === 'hadir').length;
      const telat = memberRecords.filter(a => a.status === 'telat').length;
      const tidakHadir = memberRecords.filter(a => a.status === 'tidak hadir').length;
      const total = memberRecords.length;

      return {
        ...member,
        hadir,
        telat,
        tidakHadir,
        totalAttendance: total
      };
    });
  },

  getDetailedRecap(startDate, endDate) {
    const attendance = this.getData(this.KEYS.ATTENDANCE) || [];
    const members = this.getAllMembers();

    const result = {};
    
    members.forEach(member => {
      result[member.id] = {
        ...member,
        records: []
      };
    });

    attendance.forEach(record => {
      if (record.date >= startDate && record.date <= endDate) {
        if (result[record.memberId]) {
          result[record.memberId].records.push({
            date: record.date,
            status: record.status,
            isAutoMarked: record.isAutoMarked
          });
        }
      }
    });

    return Object.values(result).sort((a, b) => a.name.localeCompare(b.name));
  },

  getMemberAttendance(memberId, startDate, endDate) {
    const attendance = this.getData(this.KEYS.ATTENDANCE) || [];
    return attendance.filter(a => 
      a.memberId === parseInt(memberId) &&
      a.date >= startDate &&
      a.date <= endDate
    );
  },

  // Update attendance record (for admin edit)
  updateAttendance(memberId, date, newStatus) {
    let attendance = this.getData(this.KEYS.ATTENDANCE) || [];
    const index = attendance.findIndex(a => a.memberId === parseInt(memberId) && a.date === date);
    
    if (index !== -1) {
      attendance[index].status = newStatus;
      attendance[index].lastUpdated = new Date().toISOString();
      this.setData(this.KEYS.ATTENDANCE, attendance);
      return true;
    }
    return false;
  },

  // Delete attendance record (for admin edit)
  deleteAttendanceRecord(date, memberId) {
    let attendance = this.getData(this.KEYS.ATTENDANCE) || [];
    const beforeLength = attendance.length;
    attendance = attendance.filter(a => !(a.memberId === parseInt(memberId) && a.date === date));
    
    if (attendance.length < beforeLength) {
      this.setData(this.KEYS.ATTENDANCE, attendance);
      return true;
    }
    return false;
  },

  // ==================== ADMIN ====================
  getAdminPassword() {
    return this.getData(this.KEYS.ADMIN_PASSWORD) || 'admin123';
  },

  setAdminPassword(password) {
    this.setData(this.KEYS.ADMIN_PASSWORD, password);
    return true;
  },

  verifyAdminPassword(password) {
    return password === this.getAdminPassword();
  },

  // ==================== EXPORT/BACKUP ====================
  exportData() {
    return {
      members: this.getAllMembers(),
      accessCodes: this.getData(this.KEYS.ACCESS_CODES),
      attendance: this.getData(this.KEYS.ATTENDANCE),
      exportDate: new Date().toISOString()
    };
  },

  importData(data) {
    try {
      if (data.members) this.setData(this.KEYS.MEMBERS, data.members);
      if (data.accessCodes) this.setData(this.KEYS.ACCESS_CODES, data.accessCodes);
      if (data.attendance) this.setData(this.KEYS.ATTENDANCE, data.attendance);
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  },

  clearAllData() {
    localStorage.removeItem(this.KEYS.MEMBERS);
    localStorage.removeItem(this.KEYS.ACCESS_CODES);
    localStorage.removeItem(this.KEYS.ATTENDANCE);
    this.init();
  },

  // ==================== OSIS STRUCTURE ====================
  getAllOsisStructure() {
    return this.getData(this.KEYS.OSIS_STRUCTURE) || [];
  },

  addOsisPosition(position, name, level = 'member', parentLevel = null, photo = null) {
    const structure = this.getAllOsisStructure();
    
    const newPosition = {
      id: Date.now(),
      position: position.trim(),
      name: name.trim(),
      level: level,
      parentLevel: parentLevel,
      photo: photo,
      createdAt: new Date().toISOString()
    };

    structure.push(newPosition);
    this.setData(this.KEYS.OSIS_STRUCTURE, structure);
    return newPosition;
  },

  updateOsisPosition(id, position, name, level = 'member', parentLevel = null, photo = null) {
    const structure = this.getAllOsisStructure();
    const index = structure.findIndex(s => s.id === parseInt(id));
    
    if (index !== -1) {
      structure[index].position = position.trim();
      structure[index].name = name.trim();
      structure[index].level = level;
      structure[index].parentLevel = parentLevel;
      if (photo) structure[index].photo = photo;
      structure[index].updatedAt = new Date().toISOString();
      this.setData(this.KEYS.OSIS_STRUCTURE, structure);
      return structure[index];
    }
    return null;
  },

  deleteOsisPosition(id) {
    let structure = this.getAllOsisStructure();
    const beforeLength = structure.length;
    structure = structure.filter(s => s.id !== parseInt(id));
    
    if (structure.length < beforeLength) {
      this.setData(this.KEYS.OSIS_STRUCTURE, structure);
      return true;
    }
    return false;
  }
};

// Initialize on load
Storage.init();
