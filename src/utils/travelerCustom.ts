export const getAgeTypeCode = (birthday: string) => {
  let ageTypeCode = 'ADT';

  if (!birthday) {
    return ageTypeCode; // 생년월일이 없으면 기본값 반환
  }

  const birthDate = new Date(birthday);
  const today = new Date();

  // 나이 계산
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  // 만 나이 계산
  const isBirthdayPassed = monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0);
  const manAge = isBirthdayPassed ? age : age - 1; // 생일이 지났는지 체크

  const limitAge = 12; // 나이 제한

  if (manAge > limitAge) {
    ageTypeCode = 'ADT'; // 성인
  } else if (manAge > 2) {
    ageTypeCode = 'CHD'; // 아동
  } else {
    ageTypeCode = 'INF'; // 유아
  }

  return ageTypeCode; // 최종 나이 코드 반환
};
