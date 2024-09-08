"""empty message

Revision ID: 61e3ecd2827a
Revises: 
Create Date: 2024-09-07 19:38:04.577902

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '61e3ecd2827a'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('contact',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('lastName', sa.String(length=50), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('message', sa.String(length=1000), nullable=False),
    sa.Column('privacy_policy_accepted', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=20), nullable=False),
    sa.Column('username', sa.String(length=50), nullable=False),
    sa.Column('photo', sa.String(length=200), nullable=True),
    sa.Column('phone', sa.String(length=30), nullable=True),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=80), nullable=False),
    sa.Column('country', sa.String(length=20), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('empleador',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('cif', sa.String(length=15), nullable=True),
    sa.Column('metodo_pago', sa.String(length=100), nullable=True),
    sa.Column('descripcion', sa.String(length=300), nullable=True),
    sa.Column('premium', sa.Boolean(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('cif')
    )
    op.create_table('programador',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('precio_hora', sa.Integer(), nullable=True),
    sa.Column('tecnologias', sa.String(length=200), nullable=True),
    sa.Column('experiencia', sa.Enum('JUNIOR', 'MID', 'SENIOR', name='experience'), nullable=True),
    sa.Column('descripcion', sa.String(length=300), nullable=True),
    sa.Column('rating_value', sa.Float(precision=2), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('ofertas',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('nombre_empresa', sa.String(length=100), nullable=False),
    sa.Column('descripcion', sa.String(), nullable=False),
    sa.Column('salario', sa.String(length=20), nullable=True),
    sa.Column('localidad', sa.String(length=30), nullable=False),
    sa.Column('requisitos_minimos', sa.String(length=400), nullable=False),
    sa.Column('horario', sa.String(length=100), nullable=True),
    sa.Column('tipo_contrato', sa.String(length=100), nullable=True),
    sa.Column('estudios_minimos', sa.String(length=100), nullable=True),
    sa.Column('idiomas', sa.String(length=30), nullable=True),
    sa.Column('plazo', sa.String(length=100), nullable=False),
    sa.Column('modalidad', sa.Enum('TELETRABAJO', 'PRESENCIAL', 'HYBRIDO', name='modalidad'), nullable=False),
    sa.Column('experiencia_minima', sa.Enum('JUNIOR', 'MID', 'SENIOR', name='experience'), nullable=False),
    sa.Column('fecha_publicacion', sa.Date(), nullable=False),
    sa.Column('empleador_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['empleador_id'], ['empleador.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('proyectos',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=200), nullable=False),
    sa.Column('descripcion_corta', sa.String(length=150), nullable=False),
    sa.Column('git', sa.String(length=300), nullable=True),
    sa.Column('link', sa.String(length=500), nullable=True),
    sa.Column('tecnologias', sa.String(length=200), nullable=False),
    sa.Column('programador_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['programador_id'], ['programador.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('ratings',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('programador_id', sa.Integer(), nullable=True),
    sa.Column('empleador_id', sa.Integer(), nullable=True),
    sa.Column('value', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['empleador_id'], ['empleador.id'], ),
    sa.ForeignKeyConstraint(['programador_id'], ['programador.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('favoritos',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('programador_id', sa.Integer(), nullable=True),
    sa.Column('empleador_id', sa.Integer(), nullable=True),
    sa.Column('oferta_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['empleador_id'], ['empleador.id'], ),
    sa.ForeignKeyConstraint(['oferta_id'], ['ofertas.id'], ),
    sa.ForeignKeyConstraint(['programador_id'], ['programador.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('postulados',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('oferta_id', sa.Integer(), nullable=False),
    sa.Column('estado', sa.String(length=20), nullable=False),
    sa.ForeignKeyConstraint(['oferta_id'], ['ofertas.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('user_id', 'oferta_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('postulados')
    op.drop_table('favoritos')
    op.drop_table('ratings')
    op.drop_table('proyectos')
    op.drop_table('ofertas')
    op.drop_table('programador')
    op.drop_table('empleador')
    op.drop_table('user')
    op.drop_table('contact')
    # ### end Alembic commands ###
