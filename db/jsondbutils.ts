import { JsonDB, Config } from "node-json-db";

async function getData(db: JsonDB) {
  // 为了防止数据库文件被外部修改，你可以使用reload(),方法重载数据库文件，以此获取最新的数据。
  await db.reload();
  // 获取根路径下的所有数据
  var data = await db.getData("/");

  // 从一个数据路径中获取数据
  var data = await db.getData("/test1");

  // 如果你无法确认数据路径是否存在，可以使用tr catch来包裹它，如果不存在，将进入catch块中。
  try {
    var data = await db.getData("/test1/test/dont/work");
  } catch (error) {
    // The error will tell you where the DataPath stopped. In this case test1
    // Since /test1/test does't exist.
    console.error(error);
  }
}

async function addData(db: JsonDB) {
  // 为了防止数据库文件被外部修改，你可以使用reload(),方法重载数据库文件，以此获取最新的数据。
  await db.reload();
  // 将数据推入数据库
  // 使用想要的的数据路径
  // 默认情况下，新值将覆盖旧的值
  await db.push("/test1", "super test");

  // 如果数据路径不存在，它将在推送新数据时自动创建层次结构
  await db.push("/test2/my/test", 5);

  // 你可以直接推送一个多层的json对象
  await db.push("/test3", { test: "test", json: { test: ["test"] } });

  // 如果你希望在推送数据时不是覆盖旧值，而是合并它们。你可以设置push方法的第二个参数为false。
  // 合并是递归的，可以使用Object和Array。
  await db.push(
    "/test3",
    {
      new: "cool",
      json: {
        important: 5,
      },
    },
    false
  );

  /*
      最终结果
      {
         "test":"test",
         "json":{
            "test":[
               "test"
            ],
            "important":5
         },
         "new":"cool"
      }
      */
}
async function deleteData(db: JsonDB) {
  // 为了防止数据库文件被外部修改，你可以使用reload(),方法重载数据库文件，以此获取最新的数据。
  await db.reload();
  // 删除数据
  await db.delete("/test1");
}
async function updateData(db: JsonDB) {
  // 为了防止数据库文件被外部修改，你可以使用reload(),方法重载数据库文件，以此获取最新的数据。
  await db.reload();
  // 你无法合并原始值，像下面这样，数据将会被覆盖
  await db.push("/test2/my/test/", 10, false);
  // 保存数据，如果你禁用了在推送时保存。
  await db.save();
}
// 第一个参数是数据库文件名。如果没有写扩展名，则默认为“.json”并自动添加。
// 第二个参数用于告诉数据库在每次推送后保存，如果设置false，则必须手动调用save()方法。
// 第三个参数是要求JsonDB以人类可读的格式保存数据库。（默认为false）
// 最后一个参数是分隔符。默认情况下为斜线（/）
export default function jsondb() {
  var db = new JsonDB(new Config("myDataBase", true, false, "/"));
}
