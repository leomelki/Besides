class FloatUtils {
    private static acceptation: number = 1E-13;
    public static isSuperiorOrEquals(superior: number, inferior: number): boolean {
        return superior > inferior - FloatUtils.acceptation;
    }
    public static isInferiorOrEquals(inferior: number, superior: number): boolean {
        return inferior < superior + FloatUtils.acceptation;
    }
    public static isEquals(a: number, b: number): boolean {
        return Math.abs(a - b) < FloatUtils.acceptation;
    }
}
export default FloatUtils;