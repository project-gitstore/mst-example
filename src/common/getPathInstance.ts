/**
 * 解析path
 * @param path string 获取mst树节点字段
 * @returns 
 */
function getPathItem (path:string) {
    if (path.includes('[')){
        const pathName = (path.match(/(\S*)\[/) as any)[1];
        const pathIndex =  (path.match(/\[(\S*)\]/) as any)[1];
        return {
            pathName:pathName,
            pathIndex:pathIndex
        }
    } else {
        return {
            pathName: path,
            pathIndex:null
        }
    }
}

function observeInstance (target:any,pathMap:any) {
    let newTarget = target;
    if (pathMap?.pathIndex) {
        newTarget = Reflect.get(newTarget,pathMap.pathName);
        newTarget = Reflect.get(newTarget,pathMap.pathIndex);
    } else {
        newTarget = Reflect.get(target,pathMap.pathName);
    }
    if (newTarget) {
        return newTarget;
    } else {
        throw new Error('对象不存在')
    }
}

/**
 * 根据路径获取对应的mst实列
 * @param target mst 对象实例
 * @param pathArray 获取树节点节点的路径
 * @returns currentTarget mst 当前的实列
 */
export function getPathInstance<T> (target:T, pathArray:string[]) {
    let pathMap = getPathItem(pathArray[0])
    const length = pathArray.length - 1;
    let pathiIndex = 0;
    let currentTarget = target;
    while(pathiIndex <= length) {
        pathMap = getPathItem(pathArray[pathiIndex]);
        currentTarget = observeInstance(currentTarget, pathMap);
        pathiIndex = pathiIndex + 1;
    }
    if (currentTarget) {
        return currentTarget;
    }
}