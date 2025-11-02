# LE MODELE
from enum import Enum
from sqlalchemy import Column, Integer, ForeignKey, PrimaryKeyConstraint, Enum as SQLEnum
from sqlalchemy.orm import relationship
from app.database.db import Base

class FriendshipStatus(str, Enum):
    pending = "pending"
    accepted = "accepted"
    blocked = "blocked"

class Friend(Base):
    __tablename__ = "friends"

    # ------------------------------------- Champs de la table ----------------------------------------------------
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    friend_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    status = Column(SQLEnum(FriendshipStatus), nullable=False, default=FriendshipStatus.pending)

    # ----------------------------------- Contraintes de la table -------------------------------------------------
    __table_args__ = (
        PrimaryKeyConstraint('user_id', 'friend_id', name='pk_friendship'),
    )
    
    # ---------------------------------- Clés étrangères de la table ----------------------------------------------
    user = relationship("User", foreign_keys=[user_id], backref="friends_sent")
    friend = relationship("User", foreign_keys=[friend_id], backref="friends_received")
