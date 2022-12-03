import React from 'react';
import { Col } from 'react-bootstrap';
import { Banner } from 'components';
import changes from '../../../CHANGES.json';

const Changelog = () => {
  return (
    <div className="search-container mx-auto">
      <div className="flex flex-row justify-center">
        <Col xs={12} md={8} lg={7} xl={6} className="px-0">
          <Banner />
          <div className="px-3 pt-0 pt-lg-3">
            <h5 className="underline">CHANGELOG</h5>

            {changes.map((item) => (
              <div className="py-1" key={item.version}>
                <div className="font-bold text-blue pb-1">{item.version}:</div>
                <ul>
                  {item.changes.map((change, idx) => (
                    <li key={idx} className="pb-1">
                      {change}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Col>
      </div>
    </div>
  );
};

export default Changelog;
