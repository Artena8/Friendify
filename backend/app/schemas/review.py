from pydantic import BaseModel, ConfigDict

class ReviewCreate(BaseModel):
    description: str
    author: str
    rating: int

class ReviewOut(BaseModel):
    id: int
    description: str | None
    author: str
    rating: int

    model_config = ConfigDict(from_attributes=True)