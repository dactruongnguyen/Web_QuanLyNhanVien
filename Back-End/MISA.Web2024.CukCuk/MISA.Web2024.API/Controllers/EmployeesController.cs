using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySqlConnector;
using Dapper;
using MISA.Web2024.API.Model;
namespace MISA.Web2024.API.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        bool IsValidEmail(string email)
        {
            var trimmedEmail = email.Trim();

            if (trimmedEmail.EndsWith("."))
            {
                return false; // suggested by @TK-421
            }
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == trimmedEmail;
            }
            catch
            {
                return false;
            }
        }
        /// Lấy danh sách toàn bộ nhân viên
        /// createdBy : NVMANH ( 5/8/2024)
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                //Khai báo thông tin database
                var connectionString = "Host=8.222.228.150; Port=3306; Database = HAUI_2021605543_NguyenDacTruong; User Id = manhnv; Password = 12345678";
                //1. Khởi tạo kết nối với MarieDB:
                var sqlConnection = new MySqlConnection(connectionString);
                //2.Lấy dữ liệu:
                //2.1 Câu lệnh truy vấn dữ liệu:
                var sqlCommand = "SELECT * FROM Employee";
                //2.2 Thực hiện truy vấn dữ liệu:
                var employees = sqlConnection.Query<Employee>(sql: sqlCommand);

                // Trả về kết quả cho Client
                return Ok(employees);
            }
            catch (Exception ex)
            {
                var error = new ErrorService();
                error.DevMsg = ex.Message;
                error.UserMsg = Resources.ResourceVN.Error_Exception;
                error.Data = ex.Data;
                return StatusCode(500, error);
            }
   
        }
        [HttpGet("{employeeId}")]
        public IActionResult GetById(Guid employeeId)
        {
            try
            {
                //Khai báo thông tin database
                var connectionString = "Host=8.222.228.150; Port=3306; Database = HAUI_2021605543_NguyenDacTruong; User Id = manhnv; Password = 12345678";
                //1. Khởi tạo kết nối với MarieDB:
                var sqlConnection = new MySqlConnection(connectionString);
                //2.Lấy dữ liệu:
                //2.1 Câu lệnh truy vấn dữ liệu:
                //Lưu ý nếu có tham số truyền cho câu lệnh SQL thì phải sử dụng DynamicParameter :

                var sqlCommand = $"SELECT * FROM Employee WHERE EmployeeId = '@EmployeeId'";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@EmployeeId", employeeId);
                //2.2 Thực hiện truy vấn dữ liệu:
                var employees = sqlConnection.QueryFirstOrDefault<Employee>(sql: sqlCommand, param: parameters);

                // Trả về kết quả cho Client
                return Ok(employees);
            }
            catch (Exception ex)
            {

                var error = new ErrorService();
                error.DevMsg = ex.Message;
                error.UserMsg = Resources.ResourceVN.Error_Exception;
                error.Data = ex.Data;
                return StatusCode(500, error);
            }
            
        }
        //Thêm mới nhân viên
        //return 201 - thêm thành công
        //return 400 - dữ liệu đầu vào không hợp lệ
        //return 500 có exception
        [HttpPost]
        public IActionResult Post([FromBody] Employee employee)
        {
            try
            {
                //vadidate dữ liệu
                var error = new ErrorService();
                var errorData = new Dictionary<string, string>();
                //1.2 Mã nhân viên không được phép để trống
                if(string.IsNullOrEmpty(employee.EmployeeCode))
                {
                    errorData.Add("EmployeeCode","Mã nhân viên không được phép để trống");
                      
                }
                //thông tin nhân viên bắt buộc nhập
                if (string.IsNullOrEmpty(employee.FullName))
                {
                    errorData.Add("FullName", "Họ và tên nhân viên không được phép để trống");
                }
                //email phải đúng định dạng
                if (!IsValidEmail(email:employee.Email)) 
                {
                    errorData.Add("Email", "Email không đúng định dạng");
                }
                //Mã nhân viên không được phép trùng 
                if(CheckEmployeeCode(employee.EmployeeCode))
                {
                    errorData.Add("EmployeeCode", "Mã nhân viên không được phép trùng");
                }    
                //Ngày sinh không được lớn hơn ngày hiện tại
                //...
                if (errorData.Count > 0)
                {
                    error.UserMsg = "Dữ liệu đầu vào không hợp lệ";
                    error.Data = errorData;
                    return BadRequest(error);   
                }
                //Khai báo thông tin database
                var connectionString = "Host=8.222.228.150; Port=3306; Database = HAUI_2021605543_NguyenDacTruong; User Id = manhnv; Password = 12345678";
                //1.1 Khởi tạo kết nối với MarieDB:
                var sqlConnection = new MySqlConnection(connectionString);
                //Thực hiện thêm mới vòa data base
                var sqlCommand = " INSERT INTO Employee (EmployeeId, EmployeeCode, FullName, DateOfBirth,  IdentityNumber, Email, PhoneNumber, Address, LandlineNumber, BankAccount, BankName) " +
                                 "VALUES (@EmployeeId, @EmployeeCode, @FullName, @DateOfBirth,  @IdentityNumber, @Email, @PhoneNumber, @Address, @LandlineNumber, @BankAccount, @BankName)";
                //var dynamicParam = new DynamicParameters();
                employee.EmployeeId = Guid.NewGuid();
                var res = sqlConnection.Execute(sql:sqlCommand, param: employee);
                return StatusCode(201, res);
            }
            catch (Exception ex)
            {

                var error = new ErrorService();
                error.DevMsg = ex.Message;
                error.UserMsg = Resources.ResourceVN.Error_Exception;
                error.Data = ex.Data;
                return StatusCode(500, error);
            }
        }
        //Kiểm tra mã nhân viên có bị trùng hay không
        private bool CheckEmployeeCode(string employeeCode)
        {
            //Khai báo thông tin database
            var connectionString = "Host=8.222.228.150; Port=3306; Database = HAUI_2021605543_NguyenDacTruong; User Id = manhnv; Password = 12345678";
            //1.1 Khởi tạo kết nối với MarieDB:
            var sqlConnection = new MySqlConnection(connectionString);
            var sqlCheck = "SELECT EmployeeCode FROM Employee WHERE EmployeeCode = @EmployeeCode";
            var dynamicParams = new DynamicParameters();
            dynamicParams.Add("@EmployeeCode", employeeCode);
            var res = sqlConnection.QueryFirstOrDefault<string>(sqlCheck,param: dynamicParams);
            if (res != null)
            {
                return true;
            }
            return false;
            
      

        }

    }
}
