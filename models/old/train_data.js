exports.training_data = () => {
  return [
    {
      age: 'old',
      disease: 'Chronic Kidney Disease',
      drinkALotOfWater: true, // ดื่มน้ำมาก
      urinatingALot: true, //ปัสสาวะมาก
      tired: true, //อ่อนเพลีย
      easilyTired: true, //เหนื่อยง่าย
      seep: true, //ซึม
      anorexia: true, //เบื่ออาหาร
      faint: false, //เป็นลม
      cough: false, //ไอ
      disorientation: false, //งุนงง สับสน
      interactionsChange: false, // ปฏิสัมพันธ์ เปลี่ยนไป
      sleepWakeCycleChange: false, //วงจรการตื่นนอนเปลี่ยน
      forgetTheDailyRoutine: false, //ลืมกิจวัตรประจำวัน
      excretionIsNotThePlace: false, //การขับถ่ายไม่ใช่สถานที่
      lessAlertness: false, //ตื่นตัวต่อสิ่งรอบข้างน้อยลง
    },
    {
      age: 'old',
      disease: 'heart disease',
      drinkALotOfWater: false, // ดื่มน้ำมาก
      urinatingALot: false, //ปัสสาวะมาก
      tired: true, //อ่อนเพลีย
      easilyTired: true, //เหนื่อยง่าย
      seep: false, //ซึม
      anorexia: false, //เบื่ออาหาร
      faint: true, //เป็นลม
      cough: true, //ไอ
      disorientation: false, //งุนงง สับสน
      interactionsChange: false, // ปฏิสัมพันธ์ เปลี่ยนไป
      sleepWakeCycleChange: false, //วงจรการตื่นนอนเปลี่ยน
      forgetTheDailyRoutine: false, //ลืมกิจวัตรประจำวัน
      excretionIsNotThePlace: false, //การขับถ่ายไม่ใช่สถานที่
      lessAlertness: false, //ตื่นตัวต่อสิ่งรอบข้างน้อยลง
    },
    {
      age: 'old',
      disease: 'dementia',
      drinkALotOfWater: false, // ดื่มน้ำมาก
      urinatingALot: false, //ปัสสาวะมาก
      tired: false, //อ่อนเพลีย
      easilyTired: false, //เหนื่อยง่าย
      seep: false, //ซึม
      anorexia: false, //เบื่ออาหาร
      faint: false, //เป็นลม
      cough: false, //ไอ
      disorientation: true, //งุนงง สับสน
      interactionsChange: true, // ปฏิสัมพันธ์ เปลี่ยนไป
      sleepWakeCycleChange: true, //วงจรการตื่นนอนเปลี่ยน
      forgetTheDailyRoutine: true, //ลืมกิจวัตรประจำวัน
      excretionIsNotThePlace: true, //การขับถ่ายไม่ใช่สถานที่
      lessAlertness: true, //ตื่นตัวต่อสิ่งรอบข้างน้อยลง
    },
  ]
}
