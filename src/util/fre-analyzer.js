const A = 440.0;
const IndexA = 10;
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

for (let index = -4; index <= 4; index++) {
  let standardA = index >= 0 ? A * 2 ** index : A / 2 ** -index;
  let fres = [];

  for (let j = 1; j <= 12; j++) {
    let fre = standardA / 2 ** ((IndexA - j) / 12);

    fres.push({
      fre,
      name: noteStrings[j - 1].replace(
        noteStrings[j - 1][0],
        noteStrings[j - 1][0] + (index + 4)
      ),
    });
  }

  AllFres.push(...fres);
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
    left =
      AllFres[minDisIndex].fre -
      (AllFres[minDisIndex].fre - AllFres[minDisIndex - 1].fre) / 2;
  }

  if (minDisIndex == AllFres.length - 1) {
    right =
      AllFres[minDisIndex].fre +
      (AllFres[minDisIndex].fre - AllFres[minDisIndex - 1].fre) / 2;
  } else {
    right =
      AllFres[minDisIndex].fre +
      (AllFres[minDisIndex + 1].fre - AllFres[minDisIndex].fre) / 2;
  }

  let seledNote = {
    name: AllFres[minDisIndex].name,
    freRange: [left, AllFres[minDisIndex].fre, right],
    cur: fre,
  };

  return seledNote;
};
