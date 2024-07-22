const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const checkRegisterData = async (req, res, next) => {
  try {
    const request = req.body;
    console.info("from checkData", request);

    // iterate throught req values
    for (let i = 0; i < request.length; i += 1) {
      // Check on each value is not null
      if (Object.values(req.body)[i] === null) {
        throw new Error(`Missing value at index : ${[i]}`);
      }

      // Check on password a second time
      if (Object.keys(req.body)[i] === "password") {
        if (!/(?=.*[a-z])/.test(Object.values(req.body)[i])) {
          throw new Error("Il manque une lettre minuscule. 🙃");
        }

        if (!/(?=.*[A-Z])/.test(Object.values(req.body)[i])) {
          throw new Error("Il manque une lettre majuscule. 🙃");
        }

        if (!/(?=.*\d)/.test(Object.values(req.body)[i])) {
          throw new Error("Il manque un chiffre. 🙃");
        }

        if (!/(?=.*[\W_])/.test(Object.values(req.body)[i])) {
          throw new Error("Il manque un caractère spécial. 🙃");
        }

        if (!/.{8,}/.test(Object.values(req.body)[i])) {
          throw new Error(
            "Il manque des caractères pour atteindre 8 caractères. 🙃"
          );
        }
      }

      // Check on email contain @
      if (Object.keys(req.body)[i] === "email") {
        // Check on email if get good pattern
        if (
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
            Object.values(req.body)[i]
          )
        ) {
          throw new Error("Erreur d'email 🤔");
        }
      }
    }

    next();
  } catch (err) {
    next(err);
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
    console.info("from hash");

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
