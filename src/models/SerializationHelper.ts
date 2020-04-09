export class SerializationHelper {

    static toInstance<T>(obj: T, _jsonobj: any) : T {
        var jsonObj = _jsonobj;

        if (typeof obj["fromJSON"] === "function") {
            obj["fromJSON"](jsonObj);
        }
        else {
            for (var propName in jsonObj) {
              if(jsonObj[propName] != undefined) {
                obj[propName] = jsonObj[propName];
              }
            }
        }

        return obj;
    }
}
