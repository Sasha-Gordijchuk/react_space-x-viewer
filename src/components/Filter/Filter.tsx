import React from 'react';

interface Props {
  rockets: any[];
  setFilterByRockets: (rocket: string) => void
  setFilterByYear: (year: number) => void
  setFilterBySuccess: (success: number) => void
}

export const Filter: React.FC<Props> = ({
  rockets,
  setFilterByRockets,
  setFilterByYear,
  setFilterBySuccess,
}) => {
  const years = [2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006];

  const selectRocket = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterByRockets(event.target.value);
  };

  const selectYear = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterByYear(+event.target.value);
  };

  const selectSuccess = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterBySuccess(+event.target.value);
  };

  return (
    <section className='filter'>
      <div className='filter__item'>
        Rocket

        <select 
          name='rocket' 
          id='rocket'
          onChange={(event) => selectRocket(event)}
        >
          <option value=''>All rockets</option>

          {rockets.map(({ name, id }) => (
            <option value={id} key={id}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className='filter__item'>
        Year

        <select 
          name='year'
          id='year'
          onChange={(event) => selectYear(event)}
        >
          <option value={0}>All years</option>

          {years.map(year => (
            <option value={year} key={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className='filter__item'>
        Success

        <select 
          name='year'
          id='year'
          onChange={(event) => selectSuccess(event)}
        >
          <option value={2}>All</option>
          <option value={1}>Yes</option>
          <option value={0}>No</option>          
        </select>
      </div>
    </section>
  );
};
