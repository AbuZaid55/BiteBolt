function useDebounce(cb:any, delay = 1000) {
    let timeId:any;
    return (...arg:any) => {
        clearTimeout(timeId);
        timeId = setTimeout(() => {
            cb(...arg)
        }, delay);
    }
}
export default useDebounce;