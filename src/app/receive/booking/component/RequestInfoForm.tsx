import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
  useWatch,
} from 'react-hook-form';
import { FlightItems, initialFlightItems } from '../services/travelerService';
import { useflightFormStore } from '../store/useFlightStore';
import RequestListInfoFormFlightItem from './item-form/RequestInfoFormFlightItem'; // 항공 예약 폼 컴포넌트 임포트

const RequestInfoForm = () => {
  const { updateflightFormValues } = useflightFormStore();
  // React Hook Form을 사용하여 폼 초기화
  const { control, setValue, watch } = useForm({
    defaultValues: {
      isCheckedFlight: false,
      isCheckedDomesticHotel: false,
      isCheckedInternationalHotel: false,
      isCheckedTrain: false,
      flightItems: [initialFlightItems], // 초기 항공 예약 폼 데이터 설정
    },
  });

  const methods = useForm({
    defaultValues: {
      flightItems: [
        {
          originAirportCode: '',
          originAirportName: '',
          destinationAirportCode: '',
          destinationAirportName: '',
          departureDate: '',
          departureTime: '',
          cabinClassCode: '',
        },
      ],
    },
  });

  // useFieldArray 훅을 사용하여 항공 폼 배열 관리
  const { fields, append, remove } = useFieldArray({
    control, // useForm의 control 객체를 전달
    name: 'flightItems', // 배열 필드의 이름 지정
  });
  const flightItemsWatch = useWatch({
    control, // useForm의 control 객체를 전달
    name: 'flightItems', // 배열 필드의 이름 지정
  });

  // 폼 데이터 관찰
  const isCheckedFlight = watch('isCheckedFlight');
  const isCheckedDomesticHotel = watch('isCheckedDomesticHotel');
  const isCheckedInternationalHotel = watch('isCheckedInternationalHotel');
  const isCheckedTrain = watch('isCheckedTrain');

  const handleFlightItemChange = (
    index: number,
    field: keyof FlightItems,
    value: any
  ) => {
    setValue(`flightItems.${index}.${field}`, value);
    updateflightFormValues(flightItemsWatch);
  };

  return (
    <FormProvider {...methods}>
      <form className="contents-box type1 line" style={{ color: 'black' }}>
        <h2 className="contents-title3 mg-b16">
          <strong className="bold">요청내역</strong>
        </h2>
        <div className="receive-selector">
          <Controller
            name="isCheckedFlight"
            control={control}
            render={({ field }) => (
              <label className="checkbox type3 md">
                <input
                  type="checkbox"
                  className="control-input"
                  checked={field.value} // value 대신 checked 속성 사용
                  onChange={(e) => field.onChange(e.target.checked)} // 체크 상태를 boolean으로 설정
                />
                <span className="control-text">항공</span>
              </label>
            )}
          />
          <Controller
            name="isCheckedDomesticHotel"
            control={control}
            render={({ field }) => (
              <label className="checkbox type3 md">
                <input
                  type="checkbox"
                  className="control-input"
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
                <span className="control-text">국내숙박</span>
              </label>
            )}
          />
          <Controller
            name="isCheckedInternationalHotel"
            control={control}
            render={({ field }) => (
              <label className="checkbox type3 md">
                <input
                  type="checkbox"
                  className="control-input"
                  checked={field.value} // value 대신 checked 속성 사용
                  onChange={(e) => field.onChange(e.target.checked)} // onChange 핸들러에서 e.target.checked를 사용하여 boolean 값 전달
                />
                <span className="control-text">해외숙박</span>
              </label>
            )}
          />
          <Controller
            name="isCheckedTrain"
            control={control}
            render={({ field }) => (
              <label className="checkbox type3 md">
                <input
                  type="checkbox"
                  className="control-input"
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
                <span className="control-text">열차(SRT)</span>
              </label>
            )}
          />
        </div>
        {/* 항공 예약 폼 표시 */}
        {isCheckedFlight && (
          <details className="accordion receive" open>
            <summary className="accordion-header">
              <span>항공 예약</span>
            </summary>
            <div className="accordion-body">
              {/* 항공 예약 폼 리스트 출력 */}
              {flightItemsWatch.map((item, index) => (
                <RequestListInfoFormFlightItem
                  key={index}
                  flightItem={item}
                  flightItemIndex={index}
                  control={control}
                  onItemChange={handleFlightItemChange}
                />
              ))}

              <div className="btn-group both mg-t16">
                {fields.length > 1 && (
                  <button
                    type="button"
                    className="btn-content type2 delete sm"
                    onClick={() => remove(fields.length - 1)}>
                    항공편 삭제
                  </button>
                )}
                <button
                  type="button"
                  className="btn-content type1 add sm"
                  onClick={() => append(initialFlightItems)}>
                  항공편 추가
                </button>
              </div>
            </div>
          </details>
        )}
      </form>
    </FormProvider>
  );
};

export default RequestInfoForm;
