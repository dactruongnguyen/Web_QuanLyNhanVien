using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MISA.WebIntern.Insfrastructure.Repository;
using MISA.WenIntern.Core.Entities;
using MISA.WenIntern.Core.Interfaces;
using System.Net;

namespace MISA.WebIntern.Api.Controllers
{
    [Route("api/v1/employees")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        IEmployeeRepository _employeeRepository;
        private IEmployeeService _employeeService;
        public EmployeesController(IEmployeeRepository repository, IEmployeeService service)
        {
            _employeeRepository = repository;
            _employeeService = service;
        }

        /// <summary>
        /// Lấy tất cả thông tin nhân viên
        /// </summary>
        /// <returns>200</returns> Nguyễn Đắc Trường 15/8/2024
        [HttpGet]
        public IActionResult Get()
        {
            var res = _employeeRepository.Get();
            return StatusCode(200, res);
        }
        /// <summary>
        /// Lấy thông tin nhân viên theo mã 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public IActionResult Get(Guid id)
        {
            var res = _employeeRepository.Get(id);
            return StatusCode(200, res);
        }
        /// <summary>
        /// Thêm mới 1 nhân viên
        /// </summary>
        /// <param name="employee"></param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult Insert(Employee employee)
        {
            var res = _employeeService.InsertService(employee);
            return StatusCode(201, res);
        }
        /// <summary>
        /// Sửa thông tin nhân viên theo mã
        /// </summary>
        /// <param name="id"></param>
        /// <param name="employee"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public IActionResult Update(Guid id, [FromBody] Employee employee)
        {
             var res = _employeeService.UpdateService(id, employee);
            return StatusCode(201, res);
        }
        /// <summary>
        /// Xóa nhân viên theo mã
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            var res = _employeeRepository.Delete(id);
            return StatusCode(200, res);
            
        }
    }
}
