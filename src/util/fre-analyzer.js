const A = 440.0;
const IndexA = 12 * 5 - 2;
const noteStrings = [
  "C",
  "C♯",
  "D",
  "D♯",
  "E",
  "F",
  "F♯",
  "G",
  "G♯",
  "A",
  "A♯",
  "B",
];
const AllFres = [];

for (let index = 1; index <= 12 * 9; index++) {
  let fre = A / 2 ** ((IndexA - index - 1) / 12);
  let name = noteStrings[index % 12];

  AllFres.push({
    fre,
    name: name.replace(name[0], name[0] + parseInt(index / 12)),
  });
}

export default (fre) => {
  let minDis;
  let minDisIndex = -1;
  for (let index = 0; index < AllFres.length; index++) {
    let dis = Math.abs(fre - AllFres[index].fre);

    if (dis < minDis || minDisIndex === -1) {
      minDis = dis;
      minDisIndex = index;
    }
  }

  let left, right;

  if (minDisIndex == 0) {
    left = 0;
  } else {
    left = AllFres[minDisIndex - 1].fre;
    // AllFres[minDisIndex].fre -
    // (AllFres[minDisIndex].fre - AllFres[minDisIndex - 1].fre) / 2;
  }

  if (minDisIndex == AllFres.length - 1) {
    right =
      AllFres[minDisIndex].fre +
      (AllFres[minDisIndex].fre - AllFres[minDisIndex - 1].fre) / 2;
  } else {
    right = AllFres[minDisIndex + 1].fre;
    // AllFres[minDisIndex].fre +
    // (AllFres[minDisIndex + 1].fre - AllFres[minDisIndex].fre) / 2;
  }

  let seledNote = {
    name: AllFres[minDisIndex].name,
    freRange: [left, AllFres[minDisIndex].fre, right],
    cur: fre,
  };

  return seledNote;
};
