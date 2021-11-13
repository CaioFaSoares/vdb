import React, { useState, useContext } from 'react';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import List from '../assets/images/icons/list.svg';
import X from '../assets/images/icons/x.svg';
import AccountLogin from './components/AccountLogin.jsx';
import AccountRegister from './components/AccountRegister.jsx';
import InventoryNewCryptCard from './components/InventoryNewCryptCard.jsx';
import InventoryNewLibraryCard from './components/InventoryNewLibraryCard.jsx';
import InventoryCrypt from './components/InventoryCrypt.jsx';
import InventoryLibrary from './components/InventoryLibrary.jsx';
import InventoryButtons from './components/InventoryButtons.jsx';
import InventoryShowSelect from './components/InventoryShowSelect.jsx';
import InventoryAddDeckModal from './components/InventoryAddDeckModal.jsx';
import InventoryAddPreconModal from './components/InventoryAddPreconModal.jsx';
import AppContext from '../context/AppContext';

function Inventory(props) {
  const {
    inventoryCrypt,
    inventoryLibrary,
    usedCryptCards,
    usedLibraryCards,
    username,
    isMobile,
  } = useContext(AppContext);

  const [newCryptId, setNewCryptId] = useState(undefined);
  const [newLibraryId, setNewLibraryId] = useState(undefined);
  const [category, setCategory] = useState('all');
  const [showCrypt, setShowCrypt] = useState(true);
  const [showMenuButtons, setShowMenuButtons] = useState(false);
  const [showFloatingButtons, setShowFloatingButtons] = useState(true);
  const [showAddDeck, setShowAddDeck] = useState(false);
  const [showAddPrecon, setShowAddPrecon] = useState(false);

  const handleShowButtons = (state) => {
    setShowMenuButtons(state);
    setShowFloatingButtons(!state);
  };

  return (
    <Container
      className={isMobile ? 'main-container p-0' : 'main-container py-0'}
    >
      {username ? (
        <>
          {isMobile ? (
            <>
              {showCrypt ? (
                <>
                  <div className="sticky-insearch py-1 px-1">
                    <InventoryNewCryptCard
                      cards={inventoryCrypt}
                      setNewId={setNewCryptId}
                      inInventory={true}
                    />
                  </div>
                  {newCryptId && inventoryCrypt[newCryptId] && (
                    <div className="sticky-inv-result">
                      <InventoryCrypt
                        cards={{
                          [newCryptId]: inventoryCrypt[newCryptId],
                        }}
                        compact={true}
                        showFloatingButtons={showFloatingButtons}
                        setShowFloatingButtons={setShowFloatingButtons}
                      />
                    </div>
                  )}
                  {inventoryCrypt &&
                    (usedCryptCards.soft || usedCryptCards.hard) && (
                      <div className="pt-1">
                        <InventoryCrypt
                          withCompact={newCryptId && inventoryCrypt[newCryptId]}
                          category={category}
                          cards={inventoryCrypt}
                          showFloatingButtons={showFloatingButtons}
                          setShowFloatingButtons={setShowFloatingButtons}
                        />
                      </div>
                    )}
                </>
              ) : (
                <>
                  <div className="sticky-insearch py-1 px-1">
                    <InventoryNewLibraryCard
                      cards={inventoryLibrary}
                      setNewId={setNewLibraryId}
                      inInventory={true}
                    />
                  </div>
                  {newLibraryId && inventoryLibrary[newLibraryId] && (
                    <div className="sticky-inv-result">
                      <InventoryLibrary
                        cards={{
                          [newLibraryId]: inventoryLibrary[newLibraryId],
                        }}
                        compact={true}
                        showFloatingButtons={showFloatingButtons}
                        setShowFloatingButtons={setShowFloatingButtons}
                      />
                    </div>
                  )}
                  {inventoryLibrary &&
                    (usedLibraryCards.soft || usedLibraryCards.hard) && (
                      <div className="pt-1">
                        <InventoryLibrary
                          withCompact={newCryptId && inventoryCrypt[newCryptId]}
                          category={category}
                          cards={inventoryLibrary}
                          showFloatingButtons={showFloatingButtons}
                          setShowFloatingButtons={setShowFloatingButtons}
                        />
                      </div>
                    )}
                </>
              )}
              {showFloatingButtons && (
                <div
                  onClick={() => setShowCrypt(!showCrypt)}
                  className="d-flex float-right-middle float-add-on align-items-center justify-content-center"
                >
                  <div className="d-inline" style={{ fontSize: '1.6em' }}>
                    {showCrypt ? 'LIB' : 'CR'}
                  </div>
                </div>
              )}
            </>
          ) : (
            <Row className="mx-0">
              <Col xl={1} className="hide-narrow"></Col>
              <Col md={6} xl={5} className="px-0 px-lg-1 px-xl-3">
                <div className="sticky-insearch pt-3 pb-2">
                  <InventoryNewCryptCard
                    cards={inventoryCrypt}
                    setNewId={setNewCryptId}
                    inInventory={true}
                  />
                </div>
                {newCryptId && inventoryCrypt[newCryptId] && (
                  <div className="sticky-inv-result py-2">
                    <InventoryCrypt
                      cards={{
                        [newCryptId]: inventoryCrypt[newCryptId],
                      }}
                      compact={true}
                      showFloatingButtons={showFloatingButtons}
                      setShowFloatingButtons={setShowFloatingButtons}
                    />
                  </div>
                )}
                {inventoryCrypt &&
                  (usedCryptCards.soft || usedCryptCards.hard) && (
                    <div className="pt-2">
                      <InventoryCrypt
                        withCompact={newCryptId && inventoryCrypt[newCryptId]}
                        category={category}
                        cards={inventoryCrypt}
                        showFloatingButtons={showFloatingButtons}
                        setShowFloatingButtons={setShowFloatingButtons}
                      />
                    </div>
                  )}
              </Col>
              <Col md={4} xl={4} className="px-0 px-lg-3">
                <div className="sticky-insearch pt-3 pb-2">
                  <InventoryNewLibraryCard
                    cards={inventoryLibrary}
                    setNewId={setNewLibraryId}
                    inInventory={true}
                  />
                </div>
                {newLibraryId && inventoryLibrary[newLibraryId] && (
                  <div className="sticky-inv-result py-2">
                    <InventoryLibrary
                      cards={{
                        [newLibraryId]: inventoryLibrary[newLibraryId],
                      }}
                      compact={true}
                      showFloatingButtons={showFloatingButtons}
                      setShowFloatingButtons={setShowFloatingButtons}
                    />
                  </div>
                )}
                {inventoryLibrary &&
                  (usedLibraryCards.soft || usedLibraryCards.hard) && (
                    <div className="pt-2">
                      <InventoryLibrary
                        withCompact={
                          newLibraryId && inventoryLibrary[newLibraryId]
                        }
                        category={category}
                        cards={inventoryLibrary}
                        showFloatingButtons={showFloatingButtons}
                        setShowFloatingButtons={setShowFloatingButtons}
                      />
                    </div>
                  )}
              </Col>
              <Col md={2} className="px-0 px-md-1 px-xl-3">
                <div className="sticky">
                  <InventoryButtons
                    setShowAddDeck={setShowAddDeck}
                    setShowAddPrecon={setShowAddPrecon}
                    inventoryAddToState={props.inventoryAddToState}
                    setInventoryCrypt={props.setInventoryCrypt}
                    setInventoryLibrary={props.setInventoryLibrary}
                    setShowButtons={handleShowButtons}
                  />
                  <div className="px-4 py-2">
                    <InventoryShowSelect
                      category={category}
                      setCategory={setCategory}
                    />
                  </div>
                </div>
              </Col>
            </Row>
          )}
        </>
      ) : (
        <Row className="h-75 align-items-center justify-content-center px-2">
          <Col xs={12} md={5}>
            <div className="d-flex justify-content-center pb-3">
              <h6>Login required to manage inventory</h6>
            </div>
            <div className="py-2">
              <AccountLogin />
            </div>
            <div className="py-2">
              <AccountRegister />
            </div>
          </Col>
        </Row>
      )}
      {isMobile && showFloatingButtons && (
        <>
          <div
            onClick={() => {
              setShowMenuButtons(true);
              setShowFloatingButtons(false);
            }}
            className="d-flex float-right-bottom float-menu align-items-center justify-content-center"
          >
            <List viewBox="0 0 16 16" />
          </div>
        </>
      )}
      {showMenuButtons && (
        <Modal
          show={showMenuButtons}
          onHide={() => {
            setShowMenuButtons(false);
            setShowFloatingButtons(true);
          }}
          animation={false}
          centered={true}
        >
          <Modal.Header
            className={isMobile ? 'pt-2 pb-0 ps-2 pe-3' : 'pt-3 pb-1 px-4'}
          >
            <h5></h5>
            <Button
              variant="outline-secondary"
              onClick={() => {
                setShowMenuButtons(false);
                setShowFloatingButtons(true);
              }}
            >
              <X width="32" height="32" viewBox="0 0 16 16" />
            </Button>
          </Modal.Header>
          <Modal.Body className="p-1">
            <Container className="px-0" fluid>
              <InventoryButtons
                setShowAddDeck={setShowAddDeck}
                setShowAddPrecon={setShowAddPrecon}
                inventoryAddToState={props.inventoryAddToState}
                setInventoryCrypt={props.setInventoryCrypt}
                setInventoryLibrary={props.setInventoryLibrary}
                setShowButtons={handleShowButtons}
              />
              <div className="px-4 py-2">
                <InventoryShowSelect
                  category={category}
                  setCategory={setCategory}
                />
              </div>
            </Container>
          </Modal.Body>
        </Modal>
      )}
      {showAddDeck && (
        <InventoryAddDeckModal
          show={showAddDeck}
          handleClose={() => setShowAddDeck(false)}
          inventoryDeckAdd={props.inventoryDeckAdd}
          inventoryDeckDelete={props.inventoryDeckDelete}
        />
      )}
      {showAddPrecon && (
        <InventoryAddPreconModal
          show={showAddPrecon}
          handleClose={() => setShowAddPrecon(false)}
          inventoryDeckAdd={props.inventoryDeckAdd}
          inventoryDeckDelete={props.inventoryDeckDelete}
        />
      )}
    </Container>
  );
}

export default Inventory;
