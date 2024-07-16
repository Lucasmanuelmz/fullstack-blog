import { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../../../axiosInstance/axiosinstance";

export default function UpdateAccount() {
    const [sendUpdate, setSendUpdate] = useState({
      username: '',
      about: '',
      fileUpload: '',
      firstname:'',
      lastname: '',
      email: '',
      country: '',
      streetAddress: '',
      phoneNumber: '',
      city: '',
      region: '',
      postalCode: '',
      comments: '',
      candidates: '',
      offers: '',
      pushNotifications: ''
      })

    useEffect(() => {
    function handleUpdate() {
        axios.get('http://localhost:3000/user', axiosInstance)
        .then(response => {
            if(response.data) {
                const user = response.data.user;
                setSendUpdate(user);
            }
        })
    }
    handleUpdate()
   }, [])

   function handleChange(e) {
      const {name, value} = e.target;
      setSendUpdate(prevUser => ({
        ...prevUser,
        [name]: value
      }))

   }
   
    function handleSubmit(e) {
        e.preventDefault();
    
            axios.put(`http://localhost:3000/user/${sendUpdate.id}`, sendUpdate, axiosInstance)
            .then(response => {
                if (response.data) {
                console.log("Usuário atualizado com sucesso:", response.data);

            } else {
                console.error("Falha ao atualizar usuário");
            }
            }).catch ((error) => {
            console.error("Erro ao atualizar usuário:", error.message);
        })
    }

    return(
    <form className="container mx-auto max-w-screen-xl py-8" onSubmit={handleSubmit}>
    <div className="space-y-12">
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">Perfil</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
        Essas informações não serão disponibilizadas para o público; apenas você e a plataforma terão acesso a elas
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-4">
            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
            Nome de usuário
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                <input
                  id="username"
                  value={sendUpdate.username || ''}
                  name="username"
                  onChange={handleChange}
                  type="text"
                  placeholder="juliocesar"
                  autoComplete="username"
                  className="block flex-1 px-3 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          <div className="col-span-full">
            <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
              Sobre
            </label>
            <div className="mt-2">
              <textarea
                id="about"
                name="about"
                value={sendUpdate.about || ''}
                onChange={handleChange}
                rows={3}
                className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <p className="mt-3 text-sm leading-6 text-gray-600">Escreva algumas palavras sobre você.</p>
          </div>

          <div className="col-span-full">
            <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
              Foto
            </label>
            <div className="mt-2 flex items-center gap-x-3">
              {/* <UserCircleIcon aria-hidden="true" className="h-12 w-12 text-gray-300" />*/}
              <button
                type="button"
                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Mudar
              </button>
            </div>
          </div>

          <div className="col-span-full">
            <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
              Foto da capa
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                {/*<PhotoIcon aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300" />*/}
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Carregar um arquivo</span>
                    <input id="file-upload" value={sendUpdate.fileUpload || ''} onChange={handleChange} name="fileUpload" type="file" className="sr-only" />
                  </label>
                  <p className="pl-1">ou arraste e solte</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">Informações pessoais</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">Use um endereço permanente onde você possa receber correspondências.</p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
              Nome:
            </label>
            <div className="mt-2">
              <input
                id="firstname"
                value={sendUpdate.firstname || ''}
                onChange={handleChange}
                name="firstname"
                type="text"
                autoComplete="given-name"
                className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
            Sobrenome
            </label>
            <div className="mt-2">
              <input
                id="last-name"
                value={sendUpdate.lastname || ''}
                onChange={handleChange}
                name="lastname"
                type="text"
                autoComplete="family-name"
                className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-4">
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email:
            </label>
            <div className="mt-2">
              <input
                id="email"
                value={sendUpdate.email || ''}
                onChange={handleChange}
                name="email"
                type="email"
                autoComplete="email"
                className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
            País
            </label>
            <div className="mt-2">
              <select
                id="country"
                value={sendUpdate.country || ''}
                onChange={handleChange}
                name="country"
                autoComplete="country-name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
               <option value="bs">Bahamas</option>
<option value="bh">Bahrein</option>
<option value="bd">Bangladesh</option>
<option value="bb">Barbados</option>
<option value="by">Belarus</option>
<option value="be">Bélgica</option>
<option value="bz">Belize</option>
<option value="bj">Benin</option>
<option value="bt">Bhutan</option>
<option value="bo">Bolívia</option>
<option value="ba">Bósnia e Herzegovina</option>
<option value="bw">Botsuana</option>
<option value="br">Brasil</option>
<option value="bn">Brunei</option>
<option value="bg">Bulgária</option>
<option value="bf">Burkina Faso</option>
<option value="bi">Burundi</option>
<option value="cv">Cabo Verde</option>
<option value="kh">Camboja</option>
<option value="cm">Camarões</option>
<option value="ca">Canadá</option>
<option value="td">Chade</option>
<option value="cl">Chile</option>
<option value="cn">China</option>
<option value="cy">Chipre</option>
<option value="co">Colômbia</option>
<option value="km">Comores</option>
<option value="cg">Congo</option>
<option value="cr">Costa Rica</option>
<option value="hr">Croácia</option>
<option value="cu">Cuba</option>
<option value="dk">Dinamarca</option>
<option value="dj">Djibouti</option>
<option value="dm">Dominica</option>
<option value="eg">Egito</option>
<option value="sv">El Salvador</option>
<option value="ae">Emirados Árabes Unidos</option>
<option value="ec">Equador</option>
<option value="er">Eritreia</option>
<option value="ee">Estônia</option>
<option value="et">Etiópia</option>
<option value="fj">Fiji</option>
<option value="ph">Filipinas</option>
<option value="fi">Finlândia</option>
<option value="fr">França</option>
<option value="ga">Gabão</option>
<option value="gm">Gâmbia</option>
<option value="gh">Gana</option>
<option value="ge">Geórgia</option>
<option value="gd">Granada</option>
<option value="gr">Grécia</option>
<option value="gt">Guatemala</option>
<option value="gn">Guiné</option>
<option value="gw">Guiné-Bissau</option>
<option value="gy">Guiana</option>
<option value="ht">Haiti</option>
<option value="hn">Honduras</option>
<option value="hu">Hungria</option>
<option value="in">Índia</option>
<option value="id">Indonésia</option>
<option value="iq">Iraque</option>
<option value="ir">Irã</option>
<option value="ie">Irlanda</option>
<option value="is">Islândia</option>
<option value="il">Israel</option>
<option value="it">Itália</option>
<option value="ci">Costa do Marfim</option>
<option value="jm">Jamaica</option>
<option value="jp">Japão</option>
<option value="jo">Jordânia</option>
<option value="kz">Cazaquistão</option>
<option value="ke">Quênia</option>
<option value="kg">Quirguistão</option>
<option value="ki">Kiribati</option>
<option value="kw">Kuwait</option>
<option value="la">Laos</option>
<option value="ls">Lesoto</option>
<option value="lv">Letônia</option>
<option value="lb">Líbano</option>
<option value="lr">Libéria</option>
<option value="ly">Líbia</option>
<option value="li">Liechtenstein</option>
<option value="lt">Lituânia</option>
<option value="lu">Luxemburgo</option>
<option value="mg">Madagascar</option>
<option value="mw">Malaui</option>
<option value="mv">Maldivas</option>
<option value="my">Malásia</option>
<option value="ml">Mali</option>
<option value="mt">Malta</option>
<option value="ma">Marrocos</option>
<option value="mh">Ilhas Marshall</option>
<option value="mr">Mauritânia</option>
<option value="mu">Maurício</option>
<option value="mx">México</option>
<option value="fm">Micronésia</option>
<option value="md">Moldávia</option>
<option value="mc">Mônaco</option>
<option value="mn">Mongólia</option>
<option value="me">Montenegro</option>
<option value="mz">Moçambique</option>
<option value="mm">Birmânia (Myanmar)</option>
<option value="na">Namíbia</option>
<option value="nr">Nauru</option>
<option value="np">Nepal</option>
<option value="nz">Nova Zelândia</option>
<option value="ne">Níger</option>
<option value="ng">Nigéria</option>
<option value="ni">Nicarágua</option>
<option value="no">Noruega</option>
<option value="om">Omã</option>
<option value="nl">Países Baixos (Holanda)</option>
<option value="pw">Palau</option>
<option value="pa">Panamá</option>
<option value="pg">Papua Nova Guiné</option>
<option value="pk">Paquistão</option>
<option value="py">Paraguai</option>
<option value="pe">Peru</option>
<option value="pl">Polônia</option>
<option value="pt">Portugal</option>
<option value="qa">Catar</option>
<option value="cd">República Democrática do Congo</option>
<option value="do">República Dominicana</option>
<option value="cz">República Tcheca</option>
<option value="ro">Romênia</option>
<option value="rw">Ruanda</option>
<option value="ru">Rússia</option>
<option value="kn">São Cristóvão e Névis</option>
<option value="sm">San Marino</option>
<option value="st">São Tomé e Príncipe</option>
<option value="vc">São Vicente e Granadinas</option>
<option value="sh">Santa Helena</option>
<option value="lc">Santa Lúcia</option>
<option value="sc">Seychelles</option>
<option value="sl">Serra Leoa</option>
<option value="sg">Singapura</option>
<option value="sy">Síria</option>
<option value="so">Somália</option>
<option value="lk">Sri Lanka</option>
<option value="sz">Suazilândia</option>
<option value="sd">Sudão</option>
<option value="ss">Sudão do Sul</option>
<option value="se">Suécia</option>
<option value="ch">Suíça</option>
<option value="sr">Suriname</option>
<option value="th">Tailândia</option>
<option value="tj">Tajiquistão</option>
<option value="tz">Tanzânia</option>
<option value="tl">Timor-Leste</option>
<option value="tg">Togo</option>
<option value="to">Tonga</option>
<option value="tt">Trinidad e Tobago</option>
<option value="tn">Tunísia</option>
<option value="tr">Turquia</option>
<option value="tm">Turcomenistão</option>
<option value="tv">Tuvalu</option>
<option value="ug">Uganda</option>
<option value="ua">Ucrânia</option>
<option value="uy">Uruguai</option>
<option value="uz">Uzbequistão</option>
<option value="vu">Vanuatu</option>
<option value="ve">Venezuela</option>
<option value="vn">Vietnã</option>
<option value="ye">Iêmen</option>
<option value="zm">Zâmbia</option>
<option value="zw">Zimbábue</option>
</select>
            </div>
          </div>

          <div className="col-span-full">
            <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
            Endereço residencial
            </label>
            <div className="mt-2">
              <input
                id="street-address"
                name="streetAddress"
                value={sendUpdate.streetAddress || ''}
                onChange={handleChange}
                type="text"
                autoComplete="street-address"
                className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="col-span-full">
            <label htmlFor="phone-number" className="block text-sm font-medium leading-6 text-gray-900">
            Numero de telefone
            </label>
            <div className="mt-2">
              <input
                id="phone-number"
                value={sendUpdate.phoneNumber || ''}
                onChange={handleChange}
                name="phoneNumber"
                type="tel"
                autoComplete="phone-number"
                className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>


          <div className="sm:col-span-2 sm:col-start-1">
            <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
              Cidade
            </label>
            <div className="mt-2">
              <input
                id="city"
                name="city"
                value={sendUpdate.city || ''}
                onChange={handleChange}
                type="text"
                autoComplete="address-level2"
                className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
              Estado / Provincia
            </label>
            <div className="mt-2">
              <input
                id="region"
                name="region"
                value={sendUpdate.region || ''}
                onChange={handleChange}
                type="text"
                autoComplete="address-level1"
                className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
              ZIP / caixa postal
            </label>
            <div className="mt-2">
              <input
                id="postal-code"
                value={sendUpdate.postalCode || ''}
                name="postalCode"
                onChange={handleChange}
                type="text"
                autoComplete="postal-code"
                className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">Notificacoes</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
        Sempre iremos informá-lo sobre mudanças importantes, mas você escolhe o que mais deseja saber.
        </p>

        <div className="mt-10 space-y-10">
          <fieldset>
            <legend className="text-sm font-semibold leading-6 text-gray-900">Por Email</legend>
            <div className="mt-6 space-y-6">
              <div className="relative flex gap-x-3">
                <div className="flex h-6 items-center">
                  <input
                    id="comments"
                    name="comments"
                    value={sendUpdate.comments || ''}
                    onChange={handleChange}
                    type="checkbox"
                    className="h-4 w-4 rounded px-3 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                </div>
                <div className="text-sm leading-6">
                  <label htmlFor="comments" className="font-medium text-gray-900">
                    Comentarios
                  </label>
                  <p className="text-gray-500">Seja notificado quando alguém postar um comentário em uma publicação.</p>
                </div>
              </div>
              <div className="relative flex gap-x-3">
                <div className="flex h-6 items-center">
                  <input
                    id="candidates"
                    value={sendUpdate.candidates || ''}
                    onChange={handleChange}
                    name="candidates"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                </div>
                <div className="text-sm leading-6">
                  <label htmlFor="candidates" className="font-medium text-gray-900">
                    Candidatos
                  </label>
                  <p className="text-gray-500">Seja notificado quando um candidato se candidatar a um emprego.</p>
                </div>
              </div>
              <div className="relative flex gap-x-3">
                <div className="flex h-6 items-center">
                  <input
                    id="offers"
                    name="offers"
                    value={sendUpdate.offers || ''}
                    onChange={handleChange}
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                </div>
                <div className="text-sm leading-6">
                  <label htmlFor="offers" className="font-medium text-gray-900">
                    Ofertas
                  </label>
                  <p className="text-gray-500">Seja notificado quando um candidato aceitar ou rejeitar uma oferta.</p>
                </div>
              </div>
            </div>
          </fieldset>
          <fieldset>
            <legend className="text-sm font-semibold leading-6 text-gray-900">Notificações push</legend>
            <p className="mt-1 text-sm leading-6 text-gray-600">Elas são entregues via SMS para o seu celular.</p>
            <div className="mt-6 space-y-6">
              <div className="flex items-center gap-x-3">
                <input
                  id="push-everything"
                  value={sendUpdate.pushNotifications || ''}
                  onChange={handleChange}
                  name="pushNotifications"
                  type="radio"
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                  Sempre
                </label>
              </div>
              <div className="flex items-center gap-x-3">
                <input
                  id="push-email"
                  value={sendUpdate.pushNotifications || ''}
                  onChange={handleChange}
                  name="pushNotifications"
                  type="radio"
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                  Outro email
                </label>
              </div>
              <div className="flex items-center gap-x-3">
                <input
                  id="push-nothing"
                  value={sendUpdate.pushNotifications || ''}
                  onChange={handleChange}
                  name="pushNotifications"
                  type="radio"
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">
                Nenhuma notificação push
                </label>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
    </div>

    <div className="mt-6 flex items-center justify-end gap-x-6">
      <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
        Cancelar
      </button>
      <button
        type="submit"
        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Guardar
      </button>
    </div>
  </form>
  )
}