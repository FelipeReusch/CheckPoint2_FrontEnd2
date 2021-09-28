//quando a pagina carregar
window.onload=function(){
	listar();
	document.getElementById('frmCadastro').addEventListener('submit', adicionarOuAlterar);
	document.getElementById('frmCadastro').addEventListener('submit', listar);
}

//variavel global
let idAlterar = null;

//Evento do botao cadastrar/salvar (verificação)

function adicionarOuAlterar(e){
	let nom = document.getElementById('txtNome').value;
	let p = {
		nome : !nom ? "sem nome": nom, //mesmo que if(nom = ""){ nom = "sem nome";}
		compra : new Date(document.getElementById('dtpDataCompra').value.replace("-","/")),
		estado : document.getElementById('rdoFeliz').checked ? 'Feliz' : 'Triste',
		data : new Date()
	}

	if(idAlterar == null)	
		adicionar(p);
	else if(idAlterar > 0)
		alterar(p);
	else
		alert("Ação desconhecida");	
	
	//bloqueia a ação de atualização do browser
	e.preventDefault();

}

function adicionar(p){	
	let pessoas = [];	
	let idValido = 1;	
	//se já possuir o localStorage, adiciono no array	
	if(localStorage.getItem('value') !== null ){
		pessoas = JSON.parse(localStorage.getItem('value')); //captura o array de objetos(JSON);
				
		if(pessoas.length > 0)
			idValido = 	(function obterIdValido() {	//Função Auto-executável
							 //percorre verificando se tiver "buraco" entre os numeros
							for(var i = 0; i < pessoas.length; i++)
								if(pessoas[i].Id != i+1)
									return i + 1;							
							//se nao achar, retorna o id posterior da ultima pessoa
							return pessoas[pessoas.length - 1].Id + 1;
						})();
	}	
	
	let pessoa = {
		Id: idValido,
		Nome: p.nome,
		DataCompra: p.compra.toLocaleString("pt-BR").substring(0, 10),
		Estado: p.estado,
		DataCadastro : p.data.toLocaleString("pt-BR")
	};
	
	//Adiciona o objeto ao ultimo indice do array
	pessoas.push(pessoa);	
	//Ordeno o array pelo ID do objeto
	pessoas.sort(function(a,b) {
		return a.Id - b.Id;
	});			
	//armazena no Localstorage
	localStorage.setItem('value', JSON.stringify(pessoas));	
	//reseta os campos do formulario
	document.getElementById('frmCadastro').reset();	
}

function alterar(p){
	let btn = document.getElementById('btnCadastrarSalvar');	

	pessoas = JSON.parse(localStorage.getItem('value'));
	//substituir as informaçoes
	for(let i = 0; i < pessoas.length; i++){
		if(pessoas[i].Id == idAlterar){
			pessoas[i].Nome = p.nome;
			pessoas[i].DataCompra = p.compra.toLocaleString("pt-BR").substring(0, 10);
			pessoas[i].Estado = p.estado;
			pessoas[i].DataCadastro = p.data.toLocaleString("pt-BR");
			
			btn.value = "Cadastrar";
			idAlterar = null;

			localStorage.setItem('value', JSON.stringify(pessoas));	
			document.getElementById('frmCadastro').reset();			
			break;
		}
	}
}

//função do botao Alterar
function prepararAlterar(idRow){	
	document.getElementById('btnCadastrarSalvar').value = "Salvar";
	
	let txtNome = document.getElementById('txtNome'),
	    dtpDataCompra = document.getElementById('dtpDataCompra'),
	    rdoFeliz = document.getElementById('rdoFeliz'),
	    rdoTriste = document.getElementById('rdoTriste');

	let pessoas = JSON.parse(localStorage.getItem('value'));
	for(let i = 0; i < pessoas.length; i++){
		if(pessoas[i].Id == idRow){			
			//popular os campos
			txtNome.value = pessoas[i].Nome;
			dtpDataCompra.value = pessoas[i].DataCompra.replace(/(\d{2})\/(\d{2})\/(\d{4})/,'$3-$2-$1'); //caso fosse tipo date toISOString().substring(0, 10);
			rdoFeliz.checked = !(rdoTriste.checked = (pessoas[i].Estado == 'Triste'));
			
			//recarrega a lista para limpar o th com background alterado
			listar();
			//coloco ID null (caso clicar em varios botao alterar)
			idAlterar = null;
			if(idAlterar === null){
				//mudar o background da nova linha
				var th = document.getElementById("rowTable"+i);				
				th.className = "estadoAlteracao";				
			}

			//atribuir o Id a variavel global
			idAlterar = pessoas[i].Id;
			break;
		}
	}
}

function excluir(cod){
	let pessoas = JSON.parse(localStorage.getItem('value'));

	for(let i = 0; i < pessoas.length; i++)
		if(pessoas[i].Id == cod)
			pessoas.splice(i, 1);
				
	
	localStorage.setItem('value', JSON.stringify(pessoas));
	listar();
	
	//se nao possuir mais nenhum registro, limpar o storage
	if(pessoas.length == 0)
		window.localStorage.removeItem("value");
}

function listar(){
	//se nao possuir nenhum local storage, nao fazer nada
	if(localStorage.getItem('value') === null)
		return;
	
	//captura os objetos de volta
	let pessoas = JSON.parse(localStorage.getItem('value'));
	let tbody = document.getElementById("tbodyResultados");

	//limpar o body toda vez que atualizar
	tbody.innerHTML = '';
	
	for(let i = 0; i < pessoas.length; i++){
		let	id = pessoas[i].Id,
		    nome = pessoas[i].Nome,
		    compra = pessoas[i].DataCompra,
		    estado = pessoas[i].Estado,
			data = pessoas[i].DataCadastro
			       
		tbody.innerHTML += '<tr id="rowTable'+i+'">'+
								'<td>'+id+'</td>'+
								'<td>'+nome+'</td>'+
								'<td>'+compra+'</td>'+
								'<td>'+estado+'</td>'+
								'<td>'+data+'</td>'+
								'<td><button onclick="excluir(\'' + id + '\')">Excluir</button></td>'+
								'<td><button onclick="prepararAlterar(\'' + id + '\')">Alterar</button></td>'+
						   '</tr>';		
	}
}
						