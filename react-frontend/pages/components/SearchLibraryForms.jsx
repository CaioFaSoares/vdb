import React, { useState } from 'react';
import Select from 'react-select';

import abombwe from './../../assets/images/disciplines/abombwe.gif';
import animalism from './../../assets/images/disciplines/animalism.gif';
import auspex from './../../assets/images/disciplines/auspex.gif';
import celerity from './../../assets/images/disciplines/celerity.gif';
import chimerstry from './../../assets/images/disciplines/chimerstry.gif';
import daimoinon from './../../assets/images/disciplines/daimoinon.gif';
import dominate from './../../assets/images/disciplines/dominate.gif';
import dementation from './../../assets/images/disciplines/dementation.gif';
import fortitude from './../../assets/images/disciplines/fortitude.gif';
import melpominee from './../../assets/images/disciplines/melpominee.gif';
import mytherceria from './../../assets/images/disciplines/mytherceria.gif';
import necromancy from './../../assets/images/disciplines/necromancy.gif';
import obeah from './../../assets/images/disciplines/obeah.gif';
import obfuscate from './../../assets/images/disciplines/obfuscate.gif';
import obtenebration from './../../assets/images/disciplines/obtenebration.gif';
import potence from './../../assets/images/disciplines/potence.gif';
import presence from './../../assets/images/disciplines/presence.gif';
import protean from './../../assets/images/disciplines/protean.gif';
import quietus from './../../assets/images/disciplines/quietus.gif';
import sanguinus from './../../assets/images/disciplines/sanguinus.gif';
import serpentis from './../../assets/images/disciplines/serpentis.gif';
import spiritus from './../../assets/images/disciplines/spiritus.gif';
import temporis from './../../assets/images/disciplines/temporis.gif';
import thanatosis from './../../assets/images/disciplines/thanatosis.gif';
import thaumaturgy from './../../assets/images/disciplines/thaumaturgy.gif';
import valeren from './../../assets/images/disciplines/valeren.gif';
import vicissitude from './../../assets/images/disciplines/vicissitude.gif';
import visceratika from './../../assets/images/disciplines/visceratika.gif';
import defense from '././../../assets/images/disciplines/defense.gif';
import innocence from './../../assets/images/disciplines/innocence.gif';
import justice from './../../assets/images/disciplines/justice.gif';
import martyrdom from './../../assets/images/disciplines/martyrdom.gif';
import redemption from './../../assets/images/disciplines/redemption.gif';
import vengeance from './../../assets/images/disciplines/vengeance.gif';
import vision from './../../assets/images/disciplines/vision.gif';

import abomination from './../../assets/images/clans/abomination.gif';
import ahrimane from './../../assets/images/clans/ahrimane.gif';
import akunanse from './../../assets/images/clans/akunanse.gif';
import assamite from './../../assets/images/clans/assamite.gif';
import baali from './../../assets/images/clans/baali.gif';
import bloodbrother from './../../assets/images/clans/bloodbrother.gif';
import brujah from './../../assets/images/clans/brujah.gif';
import brujahantitribu from './../../assets/images/clans/brujahantitribu.gif';
import caitiff from './../../assets/images/clans/caitiff.gif';
import daughterofcacophony from './../../assets/images/clans/daughterofcacophony.gif';
import followerofset from './../../assets/images/clans/followerofset.gif';
import gangrel from './../../assets/images/clans/gangrel.gif';
import gangrelantitribu from './../../assets/images/clans/gangrelantitribu.gif';
import gargoyle from './../../assets/images/clans/gargoyle.gif';
import giovanni from './../../assets/images/clans/giovanni.gif';
import guruhi from './../../assets/images/clans/guruhi.gif';
import harbingerofskulls from './../../assets/images/clans/harbingerofskulls.gif';
import ishtarri from './../../assets/images/clans/ishtarri.gif';
import kiasyd from './../../assets/images/clans/kiasyd.gif';
import lasombra from './../../assets/images/clans/lasombra.gif';
import malkavian from './../../assets/images/clans/malkavian.gif';
import malkavianantitribu from './../../assets/images/clans/malkavianantitribu.gif';
import nagaraja from './../../assets/images/clans/nagaraja.gif';
import nosferatu from './../../assets/images/clans/nosferatu.gif';
import nosferatuantitribu from './../../assets/images/clans/nosferatuantitribu.gif';
import osebo from './../../assets/images/clans/osebo.gif';
import pander from './../../assets/images/clans/pander.gif';
import ravnos from './../../assets/images/clans/ravnos.gif';
import salubri from './../../assets/images/clans/salubri.gif';
import salubriantitribu from './../../assets/images/clans/salubriantitribu.gif';
import samedi from './../../assets/images/clans/samedi.gif';
import toreador from './../../assets/images/clans/toreador.gif';
import toreadorantitribu from './../../assets/images/clans/toreadorantitribu.gif';
import tremere from './../../assets/images/clans/tremere.gif';
import tremereantitribu from './../../assets/images/clans/tremereantitribu.gif';
import truebrujah from './../../assets/images/clans/truebrujah.gif';
import tzimisce from './../../assets/images/clans/tzimisce.gif';
import ventrue from './../../assets/images/clans/ventrue.gif';
import ventrueantitribu from './../../assets/images/clans/ventrueantitribu.gif';
import avenger from './../../assets/images/clans/avenger.gif';
import defender from './../../assets/images/clans/defender.gif';
import innocent from './../../assets/images/clans/innocent.gif';
import judge from './../../assets/images/clans/judge.gif';
import martyr from './../../assets/images/clans/martyr.gif';
import redeemer from './../../assets/images/clans/redeemer.gif';
import visionary from './../../assets/images/clans/visionary.gif';

import action from './../../assets/images/types/action.gif';
import actionmodifier from './../../assets/images/types/actionmodifier.gif';
import ally from './../../assets/images/types/ally.gif';
import combat from './../../assets/images/types/combat.gif';
import conviction from './../../assets/images/types/conviction.gif';
import equipment from './../../assets/images/types/equipment.gif';
import event from './../../assets/images/types/event.gif';
import master from './../../assets/images/types/master.gif';
import politicalaction from './../../assets/images/types/politicalaction.gif';
import power from './../../assets/images/types/power.gif';
import reaction from './../../assets/images/types/reaction.gif';
import reflex from './../../assets/images/types/reflex.gif';
import retainer from './../../assets/images/types/retainer.gif';


function SearchLibraryFormButtons(props) {
  return (
    <div className='pr-1'>
      <button className='btn btn-outline-primary' type='submit'>
        <svg width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor'>
          <path d='M13.854 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L6.5 10.293l6.646-6.647a.5.5 0 01.708 0z' />
        </svg>
      </button>
      <button className='btn btn-outline-secondary' type='button' onClick={props.handleClearFormButton}>
        <svg width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor'>
          <path d='M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z' />
          <path d='M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z' />
        </svg>
      </button>
      <button className='btn btn-outline-secondary' type='button' onClick={props.handleClearResultButton}>
        <svg width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor'>
          <path d='M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z' />
          <path d='M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z' />
        </svg>
      </button>
    </div>
  );
}

function SearchLibraryFormText(props) {
  return (
    <div className='col-8'>
      <input
        placeholder='Card Name / Text'
        type='text'
        name='text'
        value={props.value}
        onChange={props.onChange}/>
    </div>
  );
}

function SearchLibraryFormType(props) {
  const typeicons = {
    'ANY': null,
    'Action': action,
    'Action Modifier': actionmodifier,
    'Ally': ally,
    'Combat': combat,
    'Conviction': conviction,
    'Equipment': equipment,
    'Event': event,
    'Master': master,
    'Political Action': politicalaction,
    'Power': power,
    'Reaction': reaction,
    'Reflex': reflex,
    'Retainer': retainer,
  };

  const typeoptions = [];
  Object.keys(typeicons).map((key, index) => {
    typeoptions.push({
      value: key,
      name: 'type',
      label:
      <div>
        <span style={{display: 'inline-block', width: '40px', textAlign: 'center'}}>
          <img src={typeicons[key]} className='discipline-base-image-results' />
        </span>
        {key}
      </div>
    });
  });

  return (
    <div className='form-row'>
      <div className='form-group col-3 d-flex align-items-center'>
        <label className='h6 mb-0'>
          Type:
        </label>
      </div>
      <div className='form-group col-9'>
        <Select options={typeoptions} name='clan' onChange={props.onChange} />
      </div>
    </div>
  );
}


function SearchLibraryFormDiscipline(props) {
  const disciplineicons = {
    'ANY': null,
    'Abombwe': abombwe,
    'Animalism': animalism,
    'Auspex': auspex,
    'Celerity': celerity,
    'Chimerstry': chimerstry,
    'Daimoinon': daimoinon,
    'Dominate': dominate,
    'Dementation': dementation,
    'Fortitude': fortitude,
    'Melpominee': melpominee,
    'Mytherceria': mytherceria,
    'Necromancy': necromancy,
    'Obeah': obeah,
    'Obfuscate': obfuscate,
    'Obtenebration': obtenebration,
    'Potence': potence,
    'Presence': presence,
    'Protean': protean,
    'Quietus': quietus,
    'Sanguinus': sanguinus,
    'Serpentis': serpentis,
    'Spiritus': spiritus,
    'Temporis': temporis,
    'Thanatosis': thanatosis,
    'Thaumaturgy': thaumaturgy,
    'Valeren': valeren,
    'Vicissitude': vicissitude,
    'Visceratika': visceratika,
    'Innocence': innocence,
    'Judgment': justice,
    'Martyrdom': martyrdom,
    'Redemption': redemption,
    'Vengeance': vengeance,
    'Vision': vision,
  };

  const disciplineoptions = [];
  Object.keys(disciplineicons).map((key, index) => {
    disciplineoptions.push({
      value: key,
      name: 'discipline',
      label:
      <div>
        <span style={{display: 'inline-block', width: '40px', textAlign: 'center'}}>
          <img src={disciplineicons[key]} className='discipline-base-image-results' />
        </span>
        {key}
      </div>
    });
  });

  return (
    <div className='form-row'>
      <div className='form-group col-3 d-flex align-items-center'>
        <label className='h6 mb-0'>
          Discipline:
        </label>
      </div>
      <div className='form-group col-9'>
        <Select options={disciplineoptions} name='clan' onChange={props.onChange} />
      </div>
    </div>
  );
}

function SearchLibraryFormBloodCost(props) {
  const blood = ['ANY', 1, 2, 3, 4];
  const bloodforms = blood.map( (i, index) => {
    return (
      <option key={index} value={i}>{i}</option>
    );
  });

  const bloodmoreless = [
    ['le', '<=',],
    ['eq', '==',],
    ['ge', '>=',],
  ];
  const bloodmorelessforms = bloodmoreless.map( (i, index) => {
    return (
      <option key={index} value={i[0]}>{i[1]}</option>
    );
  });

  return (
    <div className='form-row'>
      <div className='form-group col-3 d-flex align-items-center'>
        <label className='h6 mb-0'>
          Blood Cost:
        </label>
      </div>
      <div className='form-group col-9'>
        <div className='input-group'>
          <select className='custom-select' name='bloodmoreless' value={props.moreless} onChange={props.onMorelessChange}>
            {bloodmorelessforms}
          </select>
          <select className='custom-select' name='blood' value={props.value} onChange={props.onValueChange} >
            {bloodforms}
          </select>
        </div>
      </div>
    </div>
  );
}

function SearchLibraryFormPoolCost(props) {
  const pool = ['ANY', 1, 2, 3, 4, 5, 6];
  const poolforms = pool.map( (i, index) => {
    return (
      <option key={index} value={i}>{i}</option>
    );
  });

  const poolmoreless = [
    ['le', '<=',],
    ['eq', '==',],
    ['ge', '>=',],
  ];
  const poolmorelessforms = poolmoreless.map( (i, index) => {
    return (
      <option key={index} value={i[0]}>{i[1]}</option>
    );
  });

  return (
    <div className='form-row'>
      <div className='form-group col-3 d-flex align-items-center'>
        <label className='h6 mb-0'>
          Pool Cost:
        </label>
      </div>
      <div className='form-group col-9'>
        <div className='input-group'>

          <select className='custom-select' name='poolmoreless' value={props.moreless} onChange={props.onMorelessChange}>
            {poolmorelessforms}
          </select>
          <select className='custom-select' name='pool' value={props.value} onChange={props.onValueChange} >
            {poolforms}
          </select>
        </div>
      </div>
    </div>
  );
}

function SearchLibraryFormClan(props) {
  const clanicons = {
    'ANY': null,
    'Abomination': abomination,
    'Ahrimane': ahrimane,
    'Akunanse': akunanse,
    'Assamite': assamite,
    'Baali': baali,
    'Blood Brother': bloodbrother,
    'Brujah': brujah,
    'Brujah antitribu': brujahantitribu,
    'Caitiff': caitiff,
    'Daughter of Cacophony': daughterofcacophony,
    'Follower of Set': followerofset,
    'Gangrel': gangrel,
    'Gangrel antitribu': gangrelantitribu,
    'Gargoyle': gargoyle,
    'Giovanni': giovanni,
    'Guruhi': guruhi,
    'Harbinger of Skulls': harbingerofskulls,
    'Ishtarri': ishtarri,
    'Kiasyd': kiasyd,
    'Lasombra': lasombra,
    'Malkavian': malkavian,
    'Malkavian antitribu': malkavianantitribu,
    'Nagaraja': nagaraja,
    'Nosferatu': nosferatu,
    'Nosferatu antitribu': nosferatuantitribu,
    'Osebo': osebo,
    'Pander': pander,
    'Ravnos': ravnos,
    'Salubri': salubri,
    'Salubri antitribu': salubriantitribu,
    'Samedi': samedi,
    'Toreador': toreador,
    'Toreador antitribu': toreadorantitribu,
    'Tremere': tremere,
    'Tremere antitribu': tremereantitribu,
    'True Brujah': truebrujah,
    'Tzimisce': tzimisce,
    'Ventrue': ventrue,
    'Ventrue antitribu': ventrueantitribu,
    'Avenger': avenger,
    'Defender': defender,
    'Innocent': innocent,
    'Judge': judge,
    'Martyr': martyr,
    'Redeemer': redeemer,
    'Visionary': visionary,
  };

  const clanoptions = [];
  Object.keys(clanicons).map((key, index) => {
    clanoptions.push({
      value: key,
      name: 'clan',
      label:
      <div>
        <span style={{display: 'inline-block', width: '40px', textAlign: 'center'}}>
          <img src={clanicons[key]} className='discipline-base-image-results' />
        </span>
        {key}
      </div>
    });
  });

  return (
    <div className='form-row'>
      <div className='form-group col-3 d-flex align-items-center'>
        <label className='h6 mb-0'>
          Clan:
        </label>
      </div>
      <div className='form-group col-9'>
        <Select options={clanoptions} name='clan' onChange={props.onChange} />
      </div>
    </div>
  );
}


function SearchLibraryFormSect(props) {
  const sects = [
    ['ANY', 'ANY'],
    ['Camarilla', 'camarilla'],
    ['Sabbat', 'sabbat'],
    ['Laibon', 'laibon'],
    ['Independent', 'independent'],
    ['Anarch', 'anarch'],
    ['Imbued', 'imbued'],
  ];

  const sectforms = sects.map((i, index) => {
    return(
      <option key={index} value={i[1]}>{i[0]}</option>
    );
  });

  return (
    <div className='form-row'>
      <div className='form-group col-3 d-flex align-items-center'>
        <label className='h6 mb-0'>
          Sect:
        </label>
      </div>
      <div className='form-group col-9'>
        <select className='custom-select' name='sect' value={props.value} onChange={props.onChange}>
          {sectforms}
        </select>
      </div>
    </div>
  );
}


function SearchLibraryFormVotes(props) {
  const votes = [
    ['ANY', 'ANY'],
    [1, '1+'],
    [2, '2+'],
    [3, '3+'],
    [4, '4+'],
  ];

  const votesforms = votes.map((i, index) => {
    return(
      <option key={index} value={i[0]}>{i[1]}</option>
    );
  });
  return (
    <div className='form-row'>
      <div className='form-group col-3 d-flex align-items-center'>
        <label className='h6 mb-0'>
          Votes:
        </label>
      </div>
      <div className='form-group col-9'>
        <select className='custom-select' name='votes' value={props.value} onChange={props.onChange}>
          {votesforms}
        </select>
      </div>
    </div>
  );
}


function SearchLibraryFormTitle(props) {
  const title = [
    ['ANY', 'ANY'],
    ['Primogen', 'primogen'],
    ['Prince', 'prince'],
    ['Justicar', 'justicar'],
    ['Inner Circle', 'inner circle'],
    ['Baron', 'baron'],
    ['1 vote', '1 vote'],
    ['2 votes', '2 votes'],
    ['Bishop', 'bishop'],
    ['Archbishop', 'archbishop'],
    ['Priscus', 'priscus'],
    ['Cardinal', 'cardinal'],
    ['Regent', 'regent'],
    ['Magaji', 'magaji'],
  ];

  const titleforms = title.map((i, index) => {
    return(
      <option key={index} value={i[1]}>{i[0]}</option>
    );
  });

  return (
    <div className='form-row'>
      <div className='form-group col-3 d-flex align-items-center'>
        <label className='h6 mb-0'>
          Title:
        </label>
      </div>
      <div className='form-group col-9'>
        <select className='custom-select' name='title' value={props.value} onChange={props.onChange}>
          {titleforms}
        </select>
      </div>
    </div>
  );
}

function SearchLibraryFormTraits(props) {
  const traitsLeft = [
    ['intercept', '+Intercept / -Stealth'],
    ['stealth', '+Stealth / -Intercept'],
    ['bleed', '+Bleed'],
    ['strength', '+Strength'],
    ['dodge', 'Dodge'],
    ['optional maneuver', 'Maneuver'],
    ['additional strike', 'Additional Strike'],
    ['aggravated', 'Aggravated'],
    ['prevent', 'Prevent'],
  ];

  const traitsRight = [
    ['optional press', 'Press'],
    ['combat ends', 'Combat Ends'],
    ['enter combat', 'Enter combat'],
    ['bounce bleed', 'Bounce Bleed'],
    ['black hand', 'Black Hand'],
    ['seraph', 'Seraph'],
    ['anarch', 'Anarch'],
    ['infernal', 'Infernal'],
  ];

  const traitsLeftforms = traitsLeft.map( (i, index) => {
    return (
      <div key={index} className='mr-2 custom-control custom-checkbox'>
        <input id={i[0]} name='traits' className='mr-2 custom-control-input' type='checkbox' checked={props.value[i[0]]} onChange={(e) => props.onChange(e)} />
        <label htmlFor={i[0]} className='mr-2 custom-control-label'>
          {i[1]}
        </label>
      </div>
    );
  });

  const traitsRightforms = traitsRight.map( (i, index) => {
    return (
      <div key={index} className='mr-2 custom-control custom-checkbox'>
        <input id={i[0]} name='traits' className='mr-2 custom-control-input' type='checkbox' checked={props.value[i[0]]} onChange={(e) => props.onChange(e)} />
        <label htmlFor={i[0]} className='mr-2 custom-control-label'>
          {i[1]}
        </label>
      </div>
    );
  });

  return (
    <div className='pt-2'>
      <h6>Traits:</h6>
      <div className='form-row'>
        <div className='form-group col-7'>
          {traitsLeftforms}
        </div>
        <div className='form-group col-5'>
          {traitsRightforms}
        </div>
      </div>
    </div>
  );
}


function SearchLibraryFormSet(props) {
  const sets = [
    ['ANY', 'ANY'],
    ['25th', '25th Anniversary - 2019'],
    ['FB', 'First Blood - 2019'],
    ['SP', 'Sabbat Preconstructed - 2019'],
    ['Anthology', 'Anthology - 2018'],
    ['LK', 'Lost Kindred - 2018'],
    ['AU', 'Anarchs Unbound - 2016'],
    ['TU', 'The Unaligned - 2014'],
    ['DM', 'Danse Macabre - 2013'],
    ['HttB', 'Heirs to the Blood - 2010'],
    ['EK', 'Ebony Kingdom - 2009'],
    ['BSC', 'Blood Shadowed Court - 2008'],
    ['KoT', 'Keepers of Tradition - 2008'],
    ['TR', 'Twilight Rebellion - 2008'],
    ['SoC', 'Sword of Caine - 2007'],
    ['LotN', 'Lords of the Night - 2007'],
    ['NoR', 'Nights of Reckoning - 2006'],
    ['Third', 'Third Edition - 2006'],
    ['KMW', 'Kindred Most Wanted - 2005'],
    ['LoB', 'Legacies of Blood - 2005'],
    ['Gehenna', 'Gehenna - 2004'],
    ['Tenth', '10th Anniversary - 2004'],
    ['Anarchs', 'Anarchs - 2003'],
    ['BH', 'Black Hand - 2003'],
    ['CE', 'Camarilla Edition - 2002'],
    ['BL', 'Bloodlines - 2001'],
    ['FN', 'Final Nights - 2001'],
    ['SW', 'Sabbat War - 2000'],
    ['AH', 'Ancient Hearts - 1996'],
    ['DS', 'Dark Sovereigns - 1995'],
    ['VTES', 'V:TES - 1995'],
    ['Jyhad', 'Jyhad - 1994'],
    ['Promo', 'Promo'],
  ];

  const setforms = sets.map((i, index) => {
    return(
      <option key={index} value={i[0]}>{i[1]}</option>
    );
  });
  return (
    <div className='form-row'>
      <div className='form-group col-3 d-flex align-items-center'>
        <label className='h6 mb-0'>
          Set:
        </label>
      </div>
      <div className='form-group col-9'>
        <select className='custom-select' name='set' value={props.value} onChange={props.onChange}>
          {setforms}
        </select>
      </div>
    </div>
  );
}

function SearchLibraryForm(props) {
  const [state, setState] = useState({
    text: '',
    discipline: 'ANY',
    blood: 'ANY',
    bloodmoreless: 'le',
    pool: 'ANY',
    poolmoreless: 'le',
    clan: 'ANY',
    sect: 'ANY',
    title: 'ANY',
    traits: {
      'intercept': false,
      'stealth': false,
      'bleed': false,
      'strength': false,
      'dodge': false,
      'optional maneuver': false,
      'additional strike': false,
      aggravated: false,
      prevent: false,
      'optional press': false,
      'combat ends': false,
      'bounce bleed': false,
      'black hand': false,
      seraph: false,
      anarch: false,
      infernal: false,
    },
    set: 'ANY',
  });

  const handleChange = event => {
    const {name, value} = event.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSelectChange = event => {
    const {name, value} = event;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleMultiChange = event => {
    const { id, name } = event.target;
    let newState = state[name];
    newState[id] = !newState[id];
    setState(prevState => ({
      ...prevState,
      [name]: newState
    }));
  };

  const handleClearFormButton = () => {
    setState({
      text: '',
      type: 'ANY',
      discipline: 'ANY',
      clan: 'ANY',
      sect: 'ANY',
      title: 'ANY',
      blood: 'ANY',
      bloodmoreless: 'le',
      pool: 'ANY',
      poolmoreless: 'le',
      traits: {
        'intercept': false,
        'stealth': false,
        'bleed': false,
        'strength': false,
        'dodge': false,
        'optional maneuver': false,
        'additional strike': false,
        aggravated: false,
        prevent: false,
        'optional press': false,
        'combat ends': false,
        'bounce bleed': false,
        'black hand': false,
        seraph: false,
        anarch: false,
        infernal: false,
      },
      set: 'ANY',
    });
  };

  const handleClearResultButton = () => {
    props.setResults([]);
  };

  const handleSubmitButton = event => {
    event.preventDefault();

    const url = 'http://127.0.0.1:5001/api/search/library';

    let input = JSON.parse(JSON.stringify(state));
    Object.keys(input.traits).forEach(k => (input.traits[k] == false) && delete input.traits[k]);
    Object.keys(input).forEach(k => (input[k] == 'ANY' || !input[k] || Object.keys(input[k]).length === 0) && delete input[k]);
    if (input['blood'] == null) {
      delete input['bloodmoreless'];
    };

    if (input['pool'] == null) {
      delete input['poolmoreless'];
    };

    if (Object.keys(input).length === 0) {
      console.log('submit with empty forms');
    } else {
      const options = {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      };

      fetch(url, options)
        .then(result => result.json())
        .then(result => {
          props.setResults(result);
        });
    };
  };

  return (
    <form onSubmit={handleSubmitButton}>
      <div className='form-row justify-content-between'>
        <SearchLibraryFormText value={state.text} onChange={handleChange} />
        <SearchLibraryFormButtons handleClearFormButton={handleClearFormButton} handleClearResultButton={handleClearResultButton} />
      </div>
      <SearchLibraryFormType value={state.type} onChange={handleSelectChange} />
      <SearchLibraryFormDiscipline value={state.discipline} onChange={handleSelectChange}/>
      <SearchLibraryFormClan value={state.clan} onChange={handleSelectChange} />
      <SearchLibraryFormSect value={state.sect} onChange={handleChange} />
      <SearchLibraryFormTitle value={state.titles} onChange={handleChange} />
      <SearchLibraryFormBloodCost value={state.blood} moreless={state.bloodmoreless} onValueChange={handleChange} onMorelessChange={handleChange} />
      <SearchLibraryFormPoolCost value={state.pool} moreless={state.poolmoreless} onValueChange={handleChange} onMorelessChange={handleChange} />
      <SearchLibraryFormTraits value={state.traits} onChange={handleMultiChange} />
      <SearchLibraryFormSet value={state.set} onChange={handleChange} />
    </form>
  );
}

export default SearchLibraryForm;
