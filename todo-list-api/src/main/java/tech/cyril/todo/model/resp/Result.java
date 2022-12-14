package tech.cyril.todo.model.resp;

import lombok.AllArgsConstructor;
import lombok.Data;
import tech.cyril.todo.constance.ResultCode;

import static tech.cyril.todo.constance.ResultCode.*;

@Data
@AllArgsConstructor
public class Result<T> {
    private int code;
    private boolean success;
    private String msg;
    T data;

    public static <T> Result<T> ok(T data){
        return new Result<>(SUCCESS.getCode(), true, SUCCESS.getText(), data);
    }

    public static <T> Result<T> ok(){return ok(null);}

    public static <T> Result<T> failed(ResultCode code, T data){
        return new Result<>(code.getCode(), false, code.getText(), data);
    }
    public static <T> Result<T> failed(ResultCode code){
        return failed(code, null);
    }
}
