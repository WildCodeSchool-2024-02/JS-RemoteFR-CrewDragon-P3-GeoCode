const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const checkRegisterData = async (req, res, next) => {
  try {
    const request = req.body;

    // Itérer à travers les valeurs de la requête
    for (let i = 0; i < Object.keys(request).length; i += 1) {
      const key = Object.keys(request)[i];
      const value = Object.values(req.body)[i];

      // Vérifier que chaque valeur n'est pas null
      if (value === null) {
        return res.status(401).json({ error: `Missing value for ${key}` });
      }

      // Vérifier le mot de passe
      if (key === "password") {
        if (!/(?=.*[a-z])/.test(value)) {
          return res
            .status(401)
            .json({ error: "Il manque une lettre minuscule. 🙃" });
        }

        if (!/(?=.*[A-Z])/.test(value)) {
          return res
            .status(401)
            .json({ error: "Il manque une lettre majuscule. 🙃" });
        }

        if (!/(?=.*\d)/.test(value)) {
          return res.status(401).json({ error: "Il manque un chiffre. 🙃" });
        }

        if (!/(?=.*[\W_])/.test(value)) {
          return res
            .status(401)
            .json({ error: "Il manque un caractère spécial. 🙃" });
        }

        if (!/.{8,}/.test(value)) {
          return res.status(401).json({
            error: "Il manque des caractères pour atteindre 8 caractères. 🙃",
          });
        }
      }

      // Vérifier l'email
      if (key === "email") {
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value)) {
          return res.status(401).json({ error: "Erreur d'email 🤔" });
        }
      }
    }

    return next();
  } catch (err) {
    // Gérer les erreurs de manière uniforme
    return res.status(401).json({ error: err.message });
  }
};

// Options de hachage (voir documentation : https://github.com/ranisalt/node-argon2/wiki/Options)
// Recommandations **minimales** de l'OWASP : https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 19 * 2 ** 10 /* 19 Mio en kio (19 * 1024 kio) */,
  timeCost: 2,
  parallelism: 1,
};

const hashPassword = async (req, res, next) => {
  try {
    // Extraction du mot de passe de la requête

    const { password } = req.body;

    if (password !== null) {
      // Hachage du mot de passe avec les options spécifiées
      const hashedPassword = await argon2.hash(password, hashingOptions);

      // Remplacement du mot de passe non haché par le mot de passe haché dans la requête
      req.body.hashedPassword = hashedPassword;
    }

    // Suppression du mot de passe non haché de la requête par mesure de sécurité
    delete req.body.password;

    next();
  } catch (err) {
    next(err);
  }
};

const verifyToken = (req, res, next) => {
  try {
    // Vérifier la présence de l'en-tête "Authorization" dans la requête
    const authorizationHeader = req.get("Authorization");

    if (authorizationHeader == null) {
      throw new Error("Authorization header is missing");
    }

    // Vérifier que l'en-tête a la forme "Bearer <token>"
    const [type, token] = authorizationHeader.split(" ");

    if (type !== "Bearer") {
      throw new Error("Authorization header has not the 'Bearer' type");
    }

    // Vérifier la validité du token (son authenticité et sa date d'expériation)
    // En cas de succès, le payload est extrait et décodé
    req.auth = jwt.verify(token, process.env.APP_SECRET);

    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
  }
};

module.exports = {
  checkRegisterData,
  hashPassword,
  verifyToken,
};
