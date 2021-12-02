exports.training_data = () => {
  return [
    {
      age: 'child',
      disease: 'canine distemper',
      seep: true,
      conjunctivitis: true,
      tearStains: true,
      vomit: true,
      diarrhea: true,
      liquidStool: false,
      bloodyStools: false,
      verySmellyStools: false,
      cough: false,
      dryCough: false, // ไอแห้ง
      coughMucus:false,// ไอมีเสมหะ
      fever: true,
    },
    {
      age: 'child',
      disease: 'canine parvovirus',
      seep: false,
      conjunctivitis: false,
      tearStains: false,
      vomit: false,
      diarrhea: true,
      liquidStool: true,
      bloodyStools: true,
      verySmellyStools: true,
      cough: false,
      dryCough: false, // ไอแห้ง
      coughMucus:false,// ไอมีเสมหะ
      fever: false,
    },
    {
      age: 'child',
      disease: 'kennel cough',
      seep: true, // ซึม
      conjunctivitis: true, // ตาแดง
      tearStains: false, // คลาบน้ำตา
      vomit: false, // ท้องเสีย
      diarrhea: false, //อุจจาระเหม็น
      liquidStool: false, //อุจจาระเหลว
      bloodyStools: false, //อุจจาระเลือด
      verySmellyStools: false, //อุจจาระเหม็น
      cough: true, //ไอ
      dryCough: true, // ไอแห้ง
      dryCough: true, // ไอแห้ง
      coughMucus:true,// ไอมีเสมหะ
      fever: true, //ไข้สูง
    },
  ]
}
