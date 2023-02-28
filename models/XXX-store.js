import { v4 } from "uuid";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import * as fs from "fs";

const store = {
  file: "./models/XXX-store.json",
  XXX: [],
  init() {
    if (!fs.existsSync(this.file)) {
      fs.writeFileSync(this.file, JSON.stringify(this));
    }
  },
};
store.init();
const db = new Low(new JSONFile(store.file));

export const XXXStore = {
  async getAllXXX() {
    await db.read();
    return db.data.XXX;
  },

  async addXXX(XXX) {
    await db.read();
    todo._id = v4();
    db.data.XXX.push(XXX);
    await db.write();
    return XXX;
  },

  async getXXXById(id) {
    await db.read();
    const todo = db.data.XXX.find((todo) => XXX._id === id);
    return XXX;
  },

  async deleteXXX(id) {
    await db.read();
    const index = db.data.XXX.findIndex((XXX) => XXX._id === id);
    db.data.XXX.splice(index, 1);
    await db.write();
  },

  async deleteAllXXX() {
    db.data.XXX = [];
    await db.write();
  },
};
