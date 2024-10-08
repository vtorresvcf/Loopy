"""empty message

Revision ID: 1ca202690ec2
Revises: 7002f0643e3b
Create Date: 2024-09-15 06:40:57.421271

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1ca202690ec2'
down_revision = '7002f0643e3b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('programador', schema=None) as batch_op:
        batch_op.alter_column('rating_value',
               existing_type=sa.REAL(),
               type_=sa.Float(precision=2),
               existing_nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('programador', schema=None) as batch_op:
        batch_op.alter_column('rating_value',
               existing_type=sa.Float(precision=2),
               type_=sa.REAL(),
               existing_nullable=True)

    # ### end Alembic commands ###
