import React, { useState, useContext } from 'react';
import { Modal, Row, Col, Button } from 'react-bootstrap';
import X from '../../assets/images/icons/x.svg';
import ArchiveFill from '../../assets/images/icons/archive-fill.svg';
import ArrowRepeat from '../../assets/images/icons/arrow-repeat.svg';
import ChevronCompactLeft from '../../assets/images/icons/chevron-compact-left.svg';
import ChevronCompactRight from '../../assets/images/icons/chevron-compact-right.svg';
import CalculatorFill from '../../assets/images/icons/calculator-fill.svg';
import ResultLibraryLayoutText from './ResultLibraryLayoutText.jsx';
import ButtonCardCopyUrl from './ButtonCardCopyUrl.jsx';
import ButtonToggleShowImage from './ButtonToggleShowImage.jsx';
import AppContext from '../../context/AppContext.js';

function ResultLibraryModal(props) {
  const { localizedLibrary, lang } = useContext(AppContext);
  const [imageSet, setImageSet] = useState(null);

  const CardImage = () => {
    const imgSrc = `${process.env.ROOT_URL}images/cards/${
      imageSet
        ? 'set/' + imageSet + '/'
        : localizedLibrary &&
          localizedLibrary[lang] &&
          localizedLibrary[lang][props.card['Id']]
        ? lang + '/'
        : 'en-EN/'
    }${props.card['ASCII Name']
      .toLowerCase()
      .replace(/[\s,:!?'".\-\(\)\/]/g, '')}.jpg`;

    return (
      <img
        className="card-popover full-width"
        src={imgSrc}
        alt={props.card['Name']}
        onClick={props.handleClose}
      />
    );
  };

  return (
    <Modal
      size="lg"
      show={true}
      onHide={props.handleClose}
      animation={false}
      centered={true}
      dialogClassName="no-border"
    >
      <Modal.Body className="p-0">
        {props.isMobile ? (
          <>
            {props.showImage ? (
              <>
                <CardImage />
                <div
                  onClick={() => props.handleModalCardChange(-1)}
                  className="prev-card-mobile"
                >
                  <ChevronCompactLeft
                    width="48"
                    height="64"
                    viewBox="4 0 12 16"
                  />
                </div>
                <div
                  onClick={() => props.handleModalCardChange(1)}
                  className="next-card-mobile"
                >
                  <ChevronCompactRight
                    width="48"
                    height="64"
                    viewBox="0 0 12 16"
                  />
                </div>
              </>
            ) : (
              <div className="p-3">
                <ResultLibraryLayoutText
                  card={props.card}
                  handleClose={props.handleClose}
                  setImageSet={setImageSet}
                />
                {props.inventoryMode && (
                  <>
                    <hr className="mx-0" />
                    <div className="pt-1">
                      <b>Inventory:</b>
                      <div className="d-flex align-items-center">
                        <div className="opacity-035">
                          <CalculatorFill />
                        </div>
                        <div className="px-1">
                          <b>
                            {props.inventoryState.softUsedMax +
                              props.inventoryState.hardUsedTotal}
                          </b>
                        </div>
                        - Total Used
                      </div>
                      <div className="d-flex align-items-center">
                        <div className="opacity-035">
                          <ArchiveFill />
                        </div>
                        <div className="px-1">
                          <b>{props.inventoryState.inInventory}</b>
                        </div>
                        - In Inventory
                      </div>
                      {props.inventoryState.usedDescription.soft && (
                        <>{props.inventoryState.usedDescription.soft}</>
                      )}
                      {props.inventoryState.usedDescription.hard && (
                        <>{props.inventoryState.usedDescription.hard}</>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}
            <div
              onClick={props.handleClose}
              className="float-right-bottom clear"
            >
              <div className="pt-1 float-clear">
                <X viewBox="0 0 16 16" />
              </div>
            </div>
            <div
              onClick={() => props.setShowImage(!props.showImage)}
              className="float-right-middle add-on"
            >
              <div className="pt-1 float-add">
                <ArrowRepeat viewBox="0 0 16 16" />
              </div>
            </div>
          </>
        ) : (
          <Row className="mx-0">
            <Col lg={5} className="bg-black px-0">
              <CardImage />
            </Col>
            <Col className="p-4">
              <div className="pb-1">
                <ResultLibraryLayoutText
                  card={props.card}
                  handleClose={props.handleClose}
                  setImageSet={setImageSet}
                />
              </div>
              {props.inventoryMode && (
                <>
                  <hr className="mx-0" />
                  <div className="pt-1">
                    <b>Inventory:</b>
                    <Row>
                      <Col lg={5}>
                        <div className="d-flex align-items-center">
                          <div className="opacity-035">
                            <CalculatorFill />
                          </div>
                          <div className="px-1">
                            <b>
                              {props.inventoryState.softUsedMax +
                                props.inventoryState.hardUsedTotal}
                            </b>
                          </div>
                          - Total Used
                        </div>
                        <div className="d-flex align-items-center">
                          <div className="opacity-035">
                            <ArchiveFill />
                          </div>
                          <div className="px-1">
                            <b>{props.inventoryState.inInventory}</b>
                          </div>
                          - In Inventory
                        </div>
                      </Col>
                      <Col>
                        {props.inventoryState.usedDescription.soft && (
                          <>{props.inventoryState.usedDescription.soft}</>
                        )}
                        {props.inventoryState.usedDescription.hard && (
                          <>{props.inventoryState.usedDescription.hard}</>
                        )}
                      </Col>
                    </Row>
                  </div>
                </>
              )}
              <div className="d-flex justify-content-between pt-4">
                <div className="d-flex">
                  <div className="d-flex pr-1">
                    <ButtonCardCopyUrl
                      isMobile={props.isMobile}
                      id={props.card.Id}
                    />
                  </div>
                  <div className="d-flex pr-1">
                    <ButtonToggleShowImage
                      showImage={props.showImage}
                      setShowImage={props.setShowImage}
                    />
                  </div>
                </div>
                <Button variant="outline-secondary" onClick={props.handleClose}>
                  <div>
                    <X width="24" height="24" viewBox="0 0 16 16" /> Close
                  </div>
                </Button>
              </div>
            </Col>
            <div
              onClick={() => props.handleModalCardChange(-1)}
              className="prev-card"
            >
              <ChevronCompactLeft width="48" height="64" viewBox="4 0 12 16" />
            </div>
            <div
              onClick={() => props.handleModalCardChange(1)}
              className="next-card"
            >
              <ChevronCompactRight width="48" height="64" viewBox="0 0 12 16" />
            </div>
          </Row>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default ResultLibraryModal;
