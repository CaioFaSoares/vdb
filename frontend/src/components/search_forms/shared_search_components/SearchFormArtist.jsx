import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import cryptArtists from '~/src/assets/data/artistsCrypt.json';
import libraryArtists from '~/src/assets/data/artistsLib.json';
import { useApp } from 'context';

const SearchFormArtist = ({ target, value, onChange }) => {
  const { isMobile, isXWide } = useApp();
  const maxMenuHeight = isXWide ? 500 : 350;

  let artists;
  target == 'crypt' ? (artists = cryptArtists) : (artists = libraryArtists);

  const options = artists.map((artist, index) => {
    return {
      name: 'artist',
      value: artist,
      label: artist,
    };
  });

  options.unshift({
    name: 'artist',
    value: 'any',
    label: (
      <>
        <span className="margin-full" />
        ANY
      </>
    ),
  });

  return (
    <Row className="py-1 ps-1 mx-0 align-items-center">
      <Col xs={3} className="d-flex px-0">
        <div className="bold blue">Artist:</div>
      </Col>
      <Col xs={9} className="d-inline px-0">
        <Select
          classNamePrefix="react-select"
          options={options}
          onChange={onChange}
          menuPlacement="top"
          maxMenuHeight={maxMenuHeight}
          name="artist"
          placeholder="Artist"
          value={options.find((obj) => obj.value === value)}
        />
      </Col>
    </Row>
  );
};

export default SearchFormArtist;
