export const validateJWT = (req, res, next) => {
    next();
    return;
    const token = req.header('x-token');
    try {
        if (!token) {
            return res.status(401).json({ msg: 'No hay token en la paticion' });
        }
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ msg: '' });
    }
};
//# sourceMappingURL=validate-JWT.js.map