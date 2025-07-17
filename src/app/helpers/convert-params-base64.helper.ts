/**

 */

export function ConvertParamsBase64Helper(string: string): any {

    string = string.replace(/_/g, '/');
    string = string.replace(/-/g, '+');

    return decodeURIComponent(Array.prototype.map.call(atob(string), (c) => {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        }).join("") ) ;
}
