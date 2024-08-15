﻿using MISA.WenIntern.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.WenIntern.Core.Interfaces
{
    public interface IEmployeeRepository : IBaseRepository<Employee>
    {
        /// <summary>
        /// Hàm kiểm tra mã nhân viên trùng
        /// </summary>
        /// <param name="code">Mã cần kiểm tra</param>
        /// <returns>
        /// true - là đã trùng; false - mã chưa có trong hệ thống
        /// </returns>
        /// CreatedBy: Nguyễn Đắc Trường 14/8/2024
        bool CheckEmployeeCodeDuplicate(string code);
    }
}
