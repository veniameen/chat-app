// export type Indexed<T = unknown> = {
//   [key in string]: T;
// };

// export function isObject(variable: any) {
//   if (typeof variable === 'object' && variable !== null) return true;
//   return false;
// }

// export function merge(lhs: any, rhs: any): Indexed {
//   for (let key in rhs) {
//     if (isObject(lhs[key])) lhs[key] = merge(lhs[key], rhs[key]);
//     else lhs[key] = rhs[key];
//   }
//   return lhs;
// }

// export function set( object: Indexed, path: string, data: unknown ): Indexed | unknown {
//   if (!isObject(object)) return object;
//   if (typeof path !== 'string') throw new Error('path must be string');
//   const arr = path.split('.');
//   const obj: Indexed = arr.reduceRight((prev, cur, i, arr) => ({ [cur]: i === arr.length - 1 ? data : prev }), {});
//   const merged: Indexed = merge(obj, object as Indexed);
//   object[arr[0]] = merged[arr[0]];
//   return object;
// }

export type Indexed<T = any> = {
  [key in string]: T;
};

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
  for (let p in rhs) {
    if (!rhs.hasOwnProperty(p)) {
      continue;
    }

    try {
      if (rhs[p].constructor === Object) {
        rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
      } else {
        lhs[p] = rhs[p];
      }
    } catch (e) {
      lhs[p] = rhs[p];
    }
  }

  return lhs;
}

export function set( object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  if (typeof object !== 'object' || object === null) {
    return object;
  }

  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  const result = path.split('.').reduceRight<Indexed>((acc, key) => ({ [key]: acc }), value as any);
  return merge(object as Indexed, result);
}
