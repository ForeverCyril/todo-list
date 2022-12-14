package tech.cyril.todo.constance;

public enum ResultCode {
    SUCCESS(1000, "success"),
    DB_ID_NOT_FOUND(1001, "id not found");
    private final int code;
    private final String text;

    ResultCode(int code, String text) {
        this.code = code;
        this.text = text;
    }

    public int getCode() {
        return code;
    }

    public String getText() {
        return text;
    }


    @Override
    public String toString() {
        return String.format("Result[%d: %s]", code, text);
    }
}
