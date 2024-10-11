import axios from 'axios';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const api = axios.create({
  baseURL: apiUrl,
});
const defaultParams = {
  language: 'KO',
  stationTypeCode: 'STN02',
  currency: 'KRW',
  transactionSetId: undefined,
};
// 로그인 함수 정의
export async function login(condition: any): Promise<any> {
  const params = {
    condition,
    ...defaultParams,
  };
  try {
    const response = await api.post('/user/login', params);
    if (response.data.succeedYn) {
      return response.data.result;
    } else {
      throw new Error(response.data.message || 'API response error');
    }
  } catch (error) {
    throw error;
  }
}
// 출장자 리스트
export async function corporateStaff(condition: any): Promise<any> {
  const params = {
    condition,
    ...defaultParams,
  };
  try {
    const response = await api.post('/corporate/staff', params);
    if (response.data.succeedYn) {
      return response.data.result.list;
    } else {
      throw new Error(response.data.message || 'API response error');
    }
  } catch (error) {
    throw error;
  }
}
// 목적지 리스트
export async function majorDestination(condition: any): Promise<any> {
  const params = {
    condition,
    ...defaultParams,
  };
  try {
    const response = await api.post('/common/major-destination', params);
    if (response.data.succeedYn) {
      return response.data.result.list;
    } else {
      throw new Error(response.data.message || 'API response error');
    }
  } catch (error) {
    throw error;
  }
}
// 캘린더
export async function calendar(condition: any): Promise<any> {
  const params = {
    condition,
    ...defaultParams,
  };
  try {
    const response = await api.post('/common/calendar', params);
    if (response.data.succeedYn) {
      return response.data.result;
    } else {
      throw new Error(response.data.message || 'API response error');
    }
  } catch (error) {
    throw error;
  }
}
