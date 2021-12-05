import React from 'react';
import ResultDisciplineImage from './ResultDisciplineImage.jsx';
import disciplinesList from './forms_data/disciplinesList.json';

function SearchCryptFormDisciplines(props) {
  const disciplinesforms = disciplinesList.map((d, index) => {
    const disciplineState = `discipline-container state${props.value[d]}`;

    return (
      <div key={index} className={disciplineState}>
        <label
          className="discipline-container d-flex justify-content-center align-items-center"
          htmlFor={d}
        >
          <input
            className="d-none"
            type="button"
            name="disciplines"
            id={d}
            onClick={(e) => props.onChange(e)}
          />
          <ResultDisciplineImage
            className="discipline-base-image-forms"
            value={d}
            superior={false}
          />
          <ResultDisciplineImage
            className="discipline-superior-image-forms"
            value={d}
            superior={true}
          />
        </label>
      </div>
    );
  });

  return (
    <div className="input-group justify-content-start py-1">
      {disciplinesforms}
    </div>
  );
}

export default SearchCryptFormDisciplines;
