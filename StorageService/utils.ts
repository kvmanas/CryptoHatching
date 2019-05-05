import * as del from "del";
import * as Loki from "lokijs";

const loadCollection = function(
  colName,
  db: Loki
): Promise<Loki.Collection<any>> {
  return new Promise(resolve => {
    db.loadDatabase({}, () => {
      const _collection =
        db.getCollection(colName) || db.addCollection(colName);
      resolve(_collection);
    });
  });
};

const imageFilter = function(req, file, cb) {
  // accept image only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

export { loadCollection, imageFilter };
