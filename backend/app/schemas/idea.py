from pydantic import BaseModel, ConfigDict

class IdeaCreate(BaseModel):
    description: str

class IdeaOut(BaseModel):
    id: int
    description: str | None

    model_config = ConfigDict(from_attributes=True)