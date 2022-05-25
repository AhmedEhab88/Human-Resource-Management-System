using HRMS_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRMS_API.Repositories
{
    public interface IEmployeeRepository
    {
        Task<IEnumerable<Employee>> Get();
        Task<Employee> Get(int id);
        Task<Employee> Create(Employee employee);
        Task Update(Employee employee);
        Task Delete(int id);
    }
}
