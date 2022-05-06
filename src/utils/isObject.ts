export default function isObject(instance: any): boolean {
  return typeof instance === 'object' && instance !== null;
}
