using HRMS_API.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRMS_API.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly EmployeeContext _context;
        public EmployeeRepository(EmployeeContext context)
        {
            _context = context;
        }

        public async Task<Employee> Create(Employee employee)
        {
            Employee empToAdd = new()
            {
                EmployeeId = employee.EmployeeId,
                SSN = employee.SSN,
                FirstName = employee.FirstName,
                LastName = employee.LastName,
                PhoneNumber = employee.PhoneNumber,
                Department = employee.Department,
                Position = employee.Position,
                Salary = employee.Salary
            };

            var duplicateEmployee = _context.Employees.Where(emp => emp.SSN == employee.SSN); 
            
            if (duplicateEmployee.FirstOrDefault() == null)
            {
                _context.Employees.Add(empToAdd);
                await _context.SaveChangesAsync();
            }
            return empToAdd;
        }

        public async Task Delete(int id)
        {
            var employeeToDelete = await _context.Employees.FindAsync(id);
            _context.Employees.Remove(employeeToDelete);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Employee>> Get()
        {
            return await _context.Employees.ToListAsync();
        }

        public async Task<Employee> Get(int id)
        {
            return await _context.Employees.FindAsync(id);
        }

        public async Task Update(Employee employee)
        {
            _context.Entry(employee).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

    }
}
