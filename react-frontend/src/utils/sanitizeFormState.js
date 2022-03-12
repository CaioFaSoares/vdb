const sanitizeFormState = (target, state) => {
  const input = JSON.parse(JSON.stringify(state));
  let forms = [];

  switch (target) {
    case 'crypt':
    case 'library':
      forms = ['text'];
      break;
  }
  forms.map((i) => {
    Object.keys(input[i]).forEach((k) => {
      input[i][k] === false && delete input[i][k];
    });
    if (!input[i]['value']) {
      delete input[i];
    }
  });

  switch (target) {
    case 'crypt':
      forms = ['disciplines', 'titles', 'group', 'traits'];
      break;
    case 'library':
      forms = ['traits'];
      break;
    case 'pda':
      forms = [
        'disciplines',
        'traits',
        'cardtypes',
        'date',
        'capacity',
        'libraryTotal',
      ];
      break;
    case 'twd':
      forms = [
        'disciplines',
        'traits',
        'cardtypes',
        'date',
        'players',
        'capacity',
        'libraryTotal',
      ];
      break;
  }
  forms.map((i) => {
    Object.keys(input[i]).forEach((k) => {
      (input[i][k] == 0 || input[i][k] == 'any') && delete input[i][k];
    });
  });

  switch (target) {
    case 'pda':
    case 'twd':
      forms = ['matchInventory'];
  }
  forms.map((i) => {
    Object.keys(input[i]).forEach((k) => {
      (input[i][k] == 0 || input[i][k] == 'any') && delete input[i][k];
    });
    if (!input[i].crypt && !input[i].library) delete input[i];
  });

  switch (target) {
    case 'crypt':
      forms = ['set', 'precon'];
      break;
    case 'library':
      forms = ['discipline', 'type', 'set', 'precon'];
      break;
    case 'pda':
    case 'twd':
      forms = [];
      break;
  }
  forms.map((i) => {
    Object.keys(input[i]).forEach((k) => {
      input[i][k] === false && delete input[i][k];
      input[i].value.map((j) => {
        j === 'any' && input[i].value.splice(j, 1);
      });
    });
  });

  switch (target) {
    case 'crypt':
      forms = ['capacity'];
      break;
    case 'library':
      forms = ['blood', 'pool', 'capacity'];
      break;
    case 'pda':
    case 'twd':
      forms = [];
      break;
  }
  forms.map((i) => {
    if (input[i][i] == 'any') {
      delete input[i];
    }
  });

  switch (target) {
    case 'crypt':
      forms = ['clan', 'sect'];
      forms.map((i) => {
        input[i].value.map((j, idx) => {
          if (j === 'any') {
            input[i].value.splice(idx, 1);
          }
        });
      });
      break;
    case 'library':
      forms = ['clan', 'sect', 'title'];
      forms.map((i) => {
        input[i].value.map((j, idx) => {
          if (j === 'any') {
            input[i].value.splice(idx, 1);
          }
        });
      });
      break;
    case 'pda':
    case 'twd':
      forms = ['crypt', 'library'];
      forms.map((i) => {
        Object.keys(input[i]).forEach((k) => {
          input[i][k] == -1 && delete input[i][k];
        });
      });
      break;
  }

  Object.keys(input).forEach((k) => {
    if (
      input[k] == 'any' ||
      !input[k] ||
      input[k].length === 0 ||
      (input[k].value && input[k].value.length === 0) ||
      Object.keys(input[k]).length === 0
    ) {
      delete input[k];
    }
  });

  return input;
};

export default sanitizeFormState;
