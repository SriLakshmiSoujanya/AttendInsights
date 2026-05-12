const fs = require('fs');
const bcrypt = require('bcryptjs');

const USERS_FILE = './users_data.json';

async function updatePasswords() {
    console.log('Reading users data...');
    const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
    
    console.log('Hashing passwords...');
    const salt = await bcrypt.genSalt(10);
    // Let's use 'student123' as default password for students and 'admin123' for admin
    const defaultStudentHash = await bcrypt.hash('student123', salt);
    const defaultAdminHash = await bcrypt.hash('admin123', salt);

    let adminExists = false;
    
    for (let user of users) {
        if (user.role === 'student' && user.password === 'hashed_password_here') {
            user.password = defaultStudentHash;
        } else if (user.role === 'admin') {
            adminExists = true;
            if (user.password === 'hashed_password_here') {
                user.password = defaultAdminHash;
            }
        }
    }
    
    if (!adminExists) {
        users.push({
            rollNo: 'ADMIN',
            email: 'admin@institution.edu',
            password: defaultAdminHash,
            role: 'admin',
            studentName: 'System Admin'
        });
        console.log('Added default admin user.');
    }

    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    console.log('Successfully updated users_data.json with hashed passwords.');
}

updatePasswords().catch(console.error);
