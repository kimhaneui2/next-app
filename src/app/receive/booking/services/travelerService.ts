//BookerInfoForm service
export const bookerInfo = {
  name: '',
  mobileNo: '',
  email: '',
};

// TravelerInfoForm service
export const initialTravelerInfo = {
  __nameDeptPosition: '',
  name: null,
  userNo: null,
  ageTypeCode: null,
  birthday: null,
  firstName: null,
  firstNameLn: null,
  gender: null,
  lastName: null,
  lastNameLn: null,
  nationalityCode: null,
  travelerIndex: 0,
};
export interface TravelerInfo {
  __nameDeptPosition: string;
  name: string | null;
  userNo: number | null;
  ageTypeCode: string | null;
  birthday: string | null;
  firstName: string | null;
  firstNameLn: string | null;
  gender: string | null;
  lastName: string | null;
  lastNameLn: string | null;
  nationalityCode: string | null;
  travelerIndex: number;
}
export interface FormValues {
  travelers: TravelerInfo[];
}

//
export interface FlightItems {
  cabinClassCode: string;
  departureDate: string;
  departureTime: string;
  destinationAirportCode: string;
  originAirportCode: string;
}
export const initialFlightItems = {
  cabinClassCode: '',
  departureDate: '',
  departureTime: '',
  destinationAirportCode: '',
  originAirportCode: '',
};
export const defaultFlightForm: FlightItem = {
  itemIndex: 1,
  tripTypeCode: 'OW',
  domesticYn: false,
  travelers: [{ travelerIndex: 1 }],
  itineraries: [],
};
export interface Itinerary {
  itineraryNo: number;
  segments: Segment[];
}
export interface FlightItem {
  itemIndex: number;
  tripTypeCode: string;
  domesticYn: boolean;
  travelers: any[];
  itineraries: Itinerary[];
}
export interface Segment {
  segmentNo: number;
  cabinClassCode: string;
  origin: {
    airportCode: string;
    departureDate: string;
    departureTime: string;
  };
  destination: {
    airportCode: string;
  };
}
