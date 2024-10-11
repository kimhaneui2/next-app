import { useState } from 'react';
import SearchResult from './SearchResult';

interface SearchProps {
  placeholder?: string;
  outsideStaffYn?: boolean;
  staffList?: Array<any>;
  loading?: boolean;
  isEmptyStaffList?: boolean;
  activeTab?: string;
  userTypeCode?: string;
  onSelectTraveler: (traveler: any) => void;
  onSearch?: (keyword: string) => void;
}

const SearchForm: React.FC<SearchProps> = ({
  placeholder = '외부인 검색',
  outsideStaffYn = false,
  staffList = [],
  loading,
  onSelectTraveler,
  onSearch,
}) => {
  const [keyword, setKeyword] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  // 검색어 입력값 변경 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  // 검색 핸들러
  const handleSearch = () => {
    if (isInValid()) {
      setError(true);
      return;
    }
    setError(false);
    if (onSearch) {
      onSearch(keyword);
    }
  };

  // Enter 키 이벤트 핸들러
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // 유효성 검사 (예제: 검색어가 비어 있을 경우)
  const isInValid = () => {
    return keyword.trim() === '';
  };
  return (
    <div>
      {/* 검색 입력 폼 */}
      <div className="list-search-form mg-b25">
        <div className={`input md line ${error ? 'valid-error' : ''}`}>
          <input
            type="text"
            value={keyword}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
          />
        </div>
        <button type="button" className="btn-search" onClick={handleSearch}>
          검색
        </button>
      </div>

      {/* 로딩 상태 */}
      {loading && (
        <div className="common-loading result">
          <i className="icon-spinner"></i>
        </div>
      )}

      {/* 검색 결과 */}
      {!loading && (
        <SearchResult
          outsideStaffYn={outsideStaffYn}
          onSelectStaffEvent={onSelectTraveler}
        />
      )}
    </div>
  );
};

export default SearchForm;
