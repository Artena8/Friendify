from enum import Enum
from typing import Final

# Open API metadata
OPEN_API_TITLE: Final = "Friendify API Hub"
OPEN_API_DESCRIPTION: Final = """
Bienvenue sur la documentation **officielle** de l'API de l'application mobile **Friendify**.  
Cette API permet de :

- Gérer les utilisateurs (création, modification, suppression)
- Accéder à des profils enrichis
- Connecter des amis entre eux
- Gérer les préférences, cadeaux, santé, loisirs et bien plus encore !
- Tests d'idées pour de futures fonctionnalités

> Développée avec ❤ par **Artena8**.

### Technologies

- **FastAPI**
- **SQLAlchemy**
- **Docker**

### Auteur

- [Portfolio Artena8](https://artena8.github.io/but-portfolio-tailwind/)
"""

# Open Api Tags
class Tags(str, Enum):
    USERS = "Utilisateurs"
    FRIENDS = "Amis"
    AUTH = "Authentification"


