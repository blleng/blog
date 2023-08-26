function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

function sliceIntoChunks(arr, chunkSize) {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    res.push(chunk);
  }
  return res;
}

function getPositions(trees) {
  let minInRow = Math.floor(Math.sqrt(trees.length));
  let maxInRow = Math.ceil(Math.sqrt(trees.length));
  if (minInRow < maxInRow) {
    trees = trees.concat(
      Array(Math.pow(maxInRow, 2) - trees.length).fill([0, "", ""])
    );
  }
  trees = shuffle([...trees]);
  let levels = sliceIntoChunks(trees, maxInRow);
  return levels;
}

const noteLabels = {
  "note-icon-1": { label: "Seedlings", count: 0, icon: "note-icon-1" },
  "note-icon-2": { label: "Saplings", count: 0, icon: "note-icon-2" },
  "note-icon-3": { label: "Trees", count: 0, icon: "note-icon-3" },
  "note-icon-4": { label: "Axes", count: 0, icon: "note-icon-4" },
  "note-icon-5": { label: "Boots", count: 0, icon: "note-icon-5" },
  "note-icon-6": { label: "Fertilizer", count: 0, icon: "note-icon-6" },
};

function forestData(data) {
  const treeCounts = JSON.parse(JSON.stringify(noteLabels));
  const canvasTrees = data.collections.note.map((n) => {
    let v = parseInt(n.data.noteIcon);
    let height = 2;
    if (!v) {
      v = n.data.noteIcon;
    } else {
      height = v;
      v = `note-icon-${v}`;
    }
    treeCounts[v].count++;
    return [v, n.url, n.data.title || n.fileSlug, height];
  });

  let legends = Object.values(treeCounts).filter((c) => c.count > 0);
  legends.sort((a, b) => b.count - a.count);
  return {
    trees: getPositions(canvasTrees),
    legends,
  };
}

function userComputed(data) {
  return {
    forest: forestData(data),
  };
}

exports.userComputed = userComputed;
