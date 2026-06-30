const User = require("../../models/User");
const brctpyjs = require("bcryptjs");
const jwt = require("jsonwebtoken");




class AuthEjsController {
    dashboard(req, res) {
        return res.render("dashboard", {
            data: req.user
        });
    }
    login(req, res) {
        return res.render("login");
    }
    register(req, res) {
        const message = req.flash('message')
        return res.render("register", { message: message });
    }

    async registerstore(req, res) {
        try {
            const { name, email, phone, password } = req.body;
            if (!name || !email || !phone || !password) {

                req.flash('message', 'All fields are required');
                return res.redirect('/register')
            }
            const userExist = await User.findOne({ email });
            if (userExist) {
                //console.log('user already exist');
                req.flash('message', 'User already exists');
                return res.redirect('/register')
            }

            const salt = await brctpyjs.genSalt(10);
            const hashPassword = await brctpyjs.hash(password, salt);

            const userdata = new User({
                name,
                email,
                phone,
                password: hashPassword,
            });

            const data = await userdata.save();
            if (data) {
                console.log(data);
                return res.redirect('/login')
            }
        } catch (error) {
            console.log(error.message);

        }
    }



    async loginstore(req, res) {
        try {
            const { email, password } = req.body
            if (!email || !password) {
                console.log('all filed is required');
                return res.redirect('/login')
            }
            const userExist = await User.findOne({ email })
            console.log(userExist);
            if (!userExist) {
                console.log('user does not exist');
                return res.redirect('/login')
            }
            const isMatch = await brctpyjs.compare(password, userExist.password)
            if (!isMatch) {
                console.log('invalid credentials');
                return res.redirect('/login')
            }
            if (isMatch && userExist.role == 'user') {
                //create token
                const Token = await jwt.sign({
                    id: userExist._id,
                    name: userExist.name,
                    email: userExist.email,
                    role: userExist.role
                }, process.env.JWT_SECRET, { expiresIn: '1d' })


                if (Token) {
                    res.cookie('token', Token, { maxAge: 86400000, httpOnly: true });
                    return res.redirect('/dashboard')
                } else {
                    console.log('something went wrong');
                    return res.redirect('/login')
                }


            }
            console.log('logon failed');
            return res.redirect('/login')

        } catch (error) {
            console.log(error.message)
        }
    }


    async logout(req, res) {
        res.clearCookie('token')
        return res.redirect('/login')
    }






    //admin section


    adminlogin(req, res) {
        return res.render('admin/login')
    }
    async adminloginstore(req, res) {
        try {
            const { email, password } = req.body
            if (!email || !password) {
                console.log('all filed is required');
                return res.redirect('/admin/login')
            }
            const userExist = await User.findOne({ email })
            //console.log(userExist);
            if (!userExist) {
                console.log('user does not exist');
                return res.redirect('/admin/login')
            }
            const isMatch = await brctpyjs.compare(password, userExist.password)
            if (!isMatch) {
                console.log('invalid credentials');
                return res.redirect('/admin/login')
            }
            if (isMatch && userExist.role == 'admin') {
                //create token
                const Token = await jwt.sign({
                    id: userExist._id,
                    name: userExist.name,
                    email: userExist.email,
                    role: userExist.role
                }, process.env.ADMIN_JWT_SECRET, { expiresIn: '1d' })


                if (Token) {
                    res.cookie('admintoken', Token, { maxAge: 86400000, httpOnly: true });
                    return res.redirect('/admin/dashboard')
                } else {
                    console.log('something went wrong');
                    return res.redirect('/admin/login')
                }


            }
            console.log('login failed');
            return res.redirect('/admin/login')

        } catch (error) {
            console.log(error.message)
        }
    }
    admindashboard(req, res) {
        try {
            return res.render('admin/dashboard', {
                Admindata: req.admin
            })
        } catch (error) {
            console.log(error.message);

        }
    }




    async adminlogout(req, res) {
        res.clearCookie('admintoken')
        return res.redirect('/admin/login')
    }








    //Manager section





    managerlogin(req, res) {
        return res.render('manager/login');
    }

    async managerloginstore(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                console.log('all fields are required');
                return res.redirect('/manager/login');
            }

            const userExist = await User.findOne({ email });
            if (!userExist) {
                console.log('user does not exist');
                return res.redirect('/manager/login');
            }

            const isMatch = await brctpyjs.compare(password, userExist.password);
            if (!isMatch) {
                console.log('invalid credentials');
                return res.redirect('/manager/login');
            }

            if (isMatch && userExist.role == 'manager') {
                const Token = await jwt.sign({
                    id: userExist._id,
                    name: userExist.name,
                    email: userExist.email,
                    role: userExist.role
                }, process.env.MANAGER_JWT_SECRET, { expiresIn: '1d' });

                if (Token) {
                    res.cookie('managertoken', Token, { maxAge: 86400000, httpOnly: true });
                    return res.redirect('/manager/dashboard');
                }
            }

            console.log('login failed');
            return res.redirect('/manager/login');
        } catch (error) {
            console.log(error.message);
        }
    }

    managerdashboard(req, res) {
        try {
            return res.render('manager/dashboard', {
                manager: req.manager
            });
        } catch (error) {
            console.log(error.message);
        }
    }

    async managerlogout(req, res) {
        res.clearCookie('managertoken');
        return res.redirect('/manager/login');
    }
}
module.exports = new AuthEjsController();