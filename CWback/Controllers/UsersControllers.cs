using CWback.Data;
using CWback.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
public class UsersController: ControllerBase{

    private readonly CWContext _context;

    public UsersController(CWContext context){
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<User>>> GetUsers(){
        var users = await _context.Users.ToListAsync();
        return Ok(users);
    }

}