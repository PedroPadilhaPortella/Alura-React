import Header from '../../components/Header';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './Anuncie.module.scss';
import { useForm } from 'react-hook-form';
import { cadastrarItem } from '../../store/reducers/itens';

export default function Anuncie() {

  const { nomeCategoria = '' } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const categorias = useSelector(state => state.categorias.map(({ nome, id }) => ({ nome, id })));

  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      categoria: nomeCategoria
    }
  });

  const { errors } = formState;

  const cadastrar = (data) => {
    dispatch(cadastrarItem(data));
    (!!nomeCategoria) ? navigate(`/categoria/${nomeCategoria}`) : navigate('/');
  }

  return (
    <div className={styles.container}>
      <Header
        titulo='Anuncie aqui!'
        descricao='Anuncie seu produto no melhor site do Brasil'
      />
      <form className={styles.formulario} onSubmit={handleSubmit(cadastrar)}>

        <Input type="text" placeholder='Nome do produto'
          className={errors.titulo ? styles['input-erro'] : ''}
          {...register('titulo', { required: 'O campo Nome é Obrigatório' })}
        />
        {errors.titulo && <span className={styles['mensagem-erro']}>{errors.titulo.message}</span>}

        <Input type="text" placeholder='Descrição do produto'
          className={errors.descricao ? styles['input-erro'] : ''}
          {...register('descricao', { required: 'O campo Descrição é Obrigatório' })}
        />
        {errors.descricao && <span className={styles['mensagem-erro']}>
          {errors.descricao.message}
        </span>}

        <Input type="text" placeholder='Url da foto do produto'
          className={errors.foto ? styles['input-erro'] : ''}
          {...register('foto', { required: 'O campo Url da Foto é Obrigatório' })}
        />
        {errors.foto && <span className={styles['mensagem-erro']}>{errors.foto.message}</span>}

        <select disabled={!!nomeCategoria} className={errors.categoria ? styles['input-erro'] : ''}
          {...register('categoria', { required: 'O campo Categoria é Obrigatório' })}>
            <option value="" disabled>Selecione a categoria</option>
            {
              categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nome}
                </option>
              ))
            }
        </select>
        {errors.categoria && <span className={styles['mensagem-erro']}>
          {errors.categoria.message}
        </span>}

        <Input type="number" placeholder='Preço do Produto'
          className={errors.preco ? styles['input-erro'] : ''}
          {...register('preco', { required: 'O campo Preço é Obrigatório', valueAsNumber: true })}
        />
        {errors.preco && <span className={styles['mensagem-erro']}>{errors.preco.message}</span>}

        <Button type='submit'>Cadastrar produto</Button>
      </form>
    </div>
  );
}