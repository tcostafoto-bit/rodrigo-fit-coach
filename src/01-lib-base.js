/* Biblioteca base reaproveitada da Diana Fit Coach (gerada por tools/extract) */
var LIB_BASE = [["Bicicleta Estática – Aquecimento","cardio","Ritmo confortável em que consegues falar sem ficar sem fôlego — só para aquecer.","Sentado na bicicleta estática"],
["Passadeira – Aquecimento","cardio","Caminhada rápida ou corrida leve, ritmo em que consegues falar. Só para aquecer.","Passadeira"],
["Alongamento do Mundo (World's Greatest)","mobilidade","Afundo grande, mão do lado da perna da frente no chão, roda o outro braço para o teto olhando para a mão. Abre anca, coluna torácica e posteriores de uma vez — o melhor aquecimento que há.","No chão, em posição de afundo com a mão apoiada"],
["Ponte Glúteos (Peso Corporal)","gluteo","Deitado, empurra a anca para cima apertando o glúteo, sem arquear demasiado a lombar.","Deitado de costas no chão"],
["Ponte Glúteos Unilateral","gluteo","Deitada, uma perna esticada no ar. Empurra a anca para cima com a outra perna, aperta o glúteo em cima e desce devagar.","Deitada de costas, um pé no chão"],
["Cat-Camel (Chão)","mobilidade","De quatro apoios, arqueia e depois arredonda a coluna lentamente, sincronizando com a respiração.","No chão, de quatro apoios"],
["Bird Dog (Chão)","core","De quatro apoios, estica o braço e a perna opostos mantendo as costas estáveis, sem rodar a bacia.","No chão, de quatro apoios"],
["Joelhos ao Peito","cardio","Corrida no lugar trazendo os joelhos à altura da anca, braços a acompanhar. Rápido.","De pé, espaço livre"],
["Agachamento (Peso Corporal)","perna","Pés à largura dos ombros, desce a anca para trás e para baixo até as coxas ficarem paralelas ao chão, sobe empurrando o chão. Peso no meio do pé.","De pé, espaço livre"],
["Agachamento Tempo 3-1-1","perna","Desce em 3 segundos, para 1 segundo no fundo e sobe em 1. O tempo lento substitui a carga.","De pé, espaço livre"],
["Box Jump","perna","Pés à largura da anca, salta para cima da caixa e aterra suave com os joelhos dobrados. Desce a pé (não saltes para baixo).","De pé de frente para a caixa"],
["Salto em Comprimento","perna","Dobra a anca e os joelhos, balança os braços e salta o mais longe possível para a frente. Aterra suave e caminha de volta.","De pé, espaço livre à frente"],
["Skaters","cardio/perna","Salta de lado para um pé, o outro cruza atrás, e volta para o outro lado. Como patinar.","De pé, espaço livre"],
["Afundo com Salto","perna","Em afundo, salta e troca de perna no ar, aterra em afundo do outro lado. Tronco direito, joelho da frente por cima do pé.","De pé, espaço livre"],
["Goblet Squat (Halter)","perna","Halter junto ao peito com as duas mãos, desce entre os joelhos mantendo o tronco vertical.","De pé, halter junto ao peito"],
["Flexões (Padrão)","peito","Mãos à largura dos ombros, corpo reto da cabeça aos calcanhares, desce até quase tocar o chão.","No chão, mãos e pontas dos pés apoiadas"],
["Flexões em Incline","peito","Mãos numa superfície elevada — versão mais fácil, boa para a técnica.","Mãos numa superfície elevada, pés no chão"],
["Remada Baixa Sentada","costas","Pés nos apoios, joelhos ligeiramente fletidos, tronco direito. Puxa a pega ao umbigo juntando as omoplatas, segura 1s e volta sem arredondar as costas. O tronco não balança.","Sentado no tapete de frente para a máquina, pés nos apoios, polia baixa"],
["Stepup (Banco + Halteres)","perna","Sobe ao banco com uma perna empurrando pelo calcanhar, desce controlado sem saltar.","De pé junto ao banco, halteres nas mãos"],
["Puxada Alta (Barra Larga)","costas","Pega mais larga que os ombros, peito alto. Puxa a barra até cima do peito levando os cotovelos para baixo e para trás. Sobe controlado até esticar os braços e sente as costas laterais a alongar.","Sentado de frente para a torre, coxas presas por baixo dos rolos, barra na polia alta"],
["Puxada Pega Fechada (Supinada)","costas","Mãos à largura dos ombros, palmas viradas para ti. Puxa até ao peito com os cotovelos junto ao corpo. Trabalha mais a parte de baixo das costas e o bíceps que a pega larga.","Sentado de frente para a torre, coxas presas, barra na polia alta"],
["Hip Thrust (Barra)","gluteo","Ombros apoiados no banco, barra na anca, empurra para cima apertando o glúteo no topo, sem hiperestender a lombar.","Sentado no chão com os ombros apoiados no banco, barra na anca"],
["Shoulder Press (Máquina)","ombros","Pegas à altura das orelhas, costas no encosto. Empurra para cima sem arquear a lombar e desce devagar até às orelhas.","Sentada na shoulder press, pegas ao lado da cabeça"],
["Pallof Press (Polia)","core","Pega à altura do peito, de lado para a polia. Estica os braços à frente e aguenta 2s sem deixar o tronco rodar. Volta e repete.","De pé de lado para a polia a meia altura"],
["Prancha Lateral (Cada lado)","core","De lado, apoiado no antebraço, corpo alinhado, anca elevada sem cair.","No chão, de lado, apoiado num antebraço"],
["Prancha (Frontal)","core","Antebraços no chão, corpo reto da cabeça aos calcanhares, aperta o abdómen e o glúteo sem deixar a anca cair.","No chão, antebraços apoiados"],
["Dead Bug (Chão)","core","Deitado, estica ao mesmo tempo o braço e a perna opostos, lombar sempre colada ao chão.","Deitado de costas no chão"],
["Hamstring Walkout","perna","Em ponte de glúteos, caminha com os calcanhares para a frente até quase esticar as pernas, mantendo a anca alta, e volta atrás.","Deitada de costas, ponte de glúteos"],
["Hollow Hold","core","Deitada de costas, lombar colada ao chão, braços e pernas esticados a uns centímetros do chão. Aguenta o tempo indicado sem a lombar descolar. Se for demais, dobra os joelhos.","Deitada de costas no tapete"],
["Superman","core","De barriga para baixo, braços à frente. Levanta ao mesmo tempo braços, peito e pernas do chão, aguenta 2s e desce.","Deitada de barriga para baixo no tapete"],
["Clamshell c/ Mini Band","gluteo","Deitada de lado, joelhos dobrados, mini band acima dos joelhos. Abre o joelho de cima como uma concha sem rodar a bacia, segura 1s e fecha devagar.","Deitada de lado, mini band nos joelhos"],
["Leg Press (Máquina)","perna","Pés à largura da anca, a meio da plataforma. Solta a segurança, desce a plataforma até os joelhos fazerem 90° sem a lombar descolar do encosto, e empurra pelos calcanhares até quase esticar — nunca bloqueies os joelhos.","Sentada na leg press, costas e anca coladas ao encosto"],
["Supino c/ Halteres","peito","Halteres descem ao nível do peito e empurra para cima juntando-os ligeiramente no topo.","Deitado no banco na horizontal, halteres nas mãos"],
["Supino Inclinado (Halteres)","peito","Banco a 30-45°, halteres descem ao peito superior com os cotovelos a 45°.","Banco a 30-45°, halteres nas mãos"],
["Leg Curl Deitada (Máquina)","perna","Rolo por cima dos tornozelos, anca colada ao banco. Traz os calcanhares aos glúteos com 1s de aperto no topo e desce devagar. Se a anca levanta, o peso é demais.","Deitada de barriga para baixo na máquina, rolo atrás dos tornozelos"],
["Leg Curl Sentada (Máquina)","perna","Almofada por cima das coxas, rolo atrás dos tornozelos. Dobra os joelhos puxando o rolo para baixo e para trás, segura 1s, volta controlado.","Sentada na máquina, costas no encosto, coxas presas"],
["Remada c/ Apoio ao Peito (Máquina)","costas","Peito apoiado na almofada, puxa as pegas para trás com os cotovelos junto ao corpo, junta as omoplatas e volta devagar. O tronco não sai da almofada.","Sentada na máquina, peito apoiado na almofada"],
["Remada com Halteres (Unilateral)","costas","Um joelho e uma mão apoiados no banco, puxa o halter até à cintura com o cotovelo junto ao corpo.","Joelho e mão apoiados no banco, halter na outra mão"],
["Remada Invertida (Mesa)","costas","Deitada por baixo de uma mesa robusta, agarra a borda com os braços esticados e puxa o peito até à mesa, corpo reto. Pés mais perto = mais fácil.","Deitada por baixo de uma mesa robusta"],
["Afundo Inverso","perna","Dá um passo grande para trás e desce até o joelho de trás quase tocar o chão, volta à posição inicial empurrando com a perna da frente. Alterna.","De pé, espaço livre"],
["Afundo Búlgaro (Banco + Halter)","perna/gluteo","Pé de trás apoiado no banco, desce a perna da frente até 90° sem o joelho passar muito a ponta do pé.","De pé, pé de trás apoiado no banco, halteres nas mãos"],
["Afundo Caminhando (Halteres)","perna","Passo grande para a frente, desce até o joelho de trás quase tocar o chão, avança alternando as pernas.","De pé, halteres nas mãos, espaço livre para andar"],
["Face Pull (Polia)","ombros","Corda na polia alta, recua um passo. Puxa na direção da testa com os cotovelos altos e abre as mãos no fim. Leve e controlado.","De pé, recuada da polia alta, corda nas mãos"],
["Elevação Lateral (Halteres)","ombros","Halteres ao lado do corpo, cotovelos ligeiramente fletidos. Eleva os braços de lado até à linha dos ombros sem encolher o trapézio e desce devagar.","De pé, halteres nas mãos"],
["Monster Walk (c/ Elástico nos joelhos)","gluteo","Elástico nos joelhos, dá passos laterais mantendo tensão constante.","De pé, elástico nos joelhos"],
["Mountain Climbers","cardio/core","Em prancha alta, traz os joelhos ao peito alternando rápido, mantendo a anca estável.","No chão, em prancha alta"],
["Corda de Saltar","cardio","Saltos pequenos e rápidos, pulsos a rodar a corda. Sem corda, faz o mesmo movimento a simular.","De pé, espaço livre"],
["Polichinelos","cardio","Salta abrindo pernas e braços ao mesmo tempo, fecha e repete. Ritmo constante.","De pé, espaço livre"],
["Alongamento Flexores da Anca","mobilidade","Empurra a anca para a frente até sentir a frente da anca da perna de trás a esticar, tronco direito, glúteo apertado. Essencial para quem passa horas sentada.","Meio-joelho no chão (perna de trás ajoelhada)"],
["Alongamento Posteriores (Hamstrings)","mobilidade","Perna esticada, inclina o tronco à frente com as costas direitas até sentir atrás da coxa. Não arredondes a lombar.","De pé, calcanhar apoiado no banco"],
["Alongamento Gémeos (Parede)","mobilidade","Mãos na parede, uma perna atrás esticada com o calcanhar no chão. Avança a anca até sentir a barriga da perna.","De pé, mãos na parede"],
["Alongamento Quadricípite (De Pé)","mobilidade","De pé, puxa o calcanhar ao glúteo com a mão do mesmo lado, joelhos juntos e anca à frente. Apoia-te se precisares.","De pé, numa perna"],
["Alongamento Glúteo (Figura 4)","mobilidade","Tornozelo sobre o joelho oposto, puxa a coxa ao peito até sentir o glúteo. Solta a anca para a rotação.","Deitado de costas no chão"],
["Alongamento Peitoral (Porta)","mobilidade","Antebraço no aro da porta, roda o corpo para o lado oposto até sentir o peito a abrir.","De pé, antebraço no aro da porta"],
["Alongamento Tríceps e Ombro","mobilidade","Braço acima da cabeça, cotovelo dobrado com a mão nas costas. Com a outra mão puxa o cotovelo suavemente.","De pé ou sentada"],
["Extensão de Pernas (Máquina)","perna","Joelhos alinhados com o eixo da máquina, rolo por cima dos tornozelos. Estica as pernas, aperta a coxa 1s em cima e desce devagar sem deixar cair.","Sentada na máquina, costas no encosto"],
["Abdutora (Máquina)","gluteo","Almofadas do lado de fora dos joelhos. Abre as pernas contra a resistência sem inclinar o tronco, segura 1s aberto e fecha devagar. Inclinar o tronco à frente carrega mais o glúteo.","Sentada na abdutora, almofadas por fora dos joelhos"],
["Adutora (Máquina)","perna","Almofadas do lado de dentro dos joelhos. Fecha as pernas apertando o interior das coxas, segura 1s e abre devagar até onde controlas.","Sentada na adutora, almofadas por dentro dos joelhos"],
["Kettlebell Swing","gluteo","Pés um pouco mais largos que a anca, kettlebell entre as pernas. Dobra a anca para trás (não é squat), deixa o KB passar entre as coxas e estica a anca com força até o KB chegar à altura do peito. Braços soltos, é a anca que manda.","De pé, kettlebell no chão à frente"],
["Abdução de Anca Deitada","gluteo","Deitada de lado, perna de cima esticada. Sobe a perna até 45° com o pé a apontar em frente (não para cima), desce devagar. Mini band nos tornozelos para dificultar.","Deitada de lado, perna de cima esticada"],
["Farmer's Carry (Halteres)","core","Halteres pesados nas mãos, ombros para trás e para baixo, caminha o tempo ou distância indicados sem inclinar para nenhum lado.","De pé, halteres ao lado do corpo"],
["Russian Twist","core","Sentada com o tronco inclinado para trás e os pés no ar (ou no chão para facilitar), roda o tronco tocando com as mãos no chão de cada lado.","Sentada no tapete, tronco inclinado"],
["V-Up","core","Deitada esticada, sobe ao mesmo tempo o tronco e as pernas até as mãos tocarem os pés (forma um V) e desce controlado.","Deitada de costas no tapete"],
["Bicicleta (Abdominal)","core","Deitada, mãos atrás da cabeça. Traz o cotovelo ao joelho oposto enquanto esticas a outra perna, alternando com ritmo controlado.","Deitada de costas no tapete"],
["Marcha no Lugar","cardio","Marcha rápida no lugar, joelhos altos, braços a balançar. Só para aquecer.","De pé"],
["Corrida no Lugar","cardio","Corrida no lugar, ritmo rápido, calcanhares ao glúteo ou joelhos altos alternados.","De pé"],
["Burpees","cardio","Agacha, prancha, flexão opcional, salta de volta e salta para cima esticando o corpo.","No chão, espaço livre à volta"],
["Woodchop (Polia)","core","Pega com as duas mãos junto ao ombro, roda anca e tronco juntos e puxa em diagonal até à anca oposta. A força vem da rotação, não dos braços.","De pé de lado para a polia alta"],
["Deadlift (Barra)","costas/perna","Barra rente às canelas, costas neutras, empurra o chão com as pernas e estica a anca — a barra fica sempre perto do corpo.","De pé, barra no chão junto às canelas"],
["RDL (Barra)","perna/gluteo","Joelhos quase esticados, desce a barra rente às pernas dobrando a anca até sentir o alongamento nos posteriores, sobe apertando o glúteo.","De pé, barra à frente das coxas"]];
var FIG = {
 "Bicicleta Estática – Aquecimento": "P l 50,112 126,112|P l 66,112 70,68|P l 62,66 78,66|P l 70,90 112,92|P l 112,92 106,50|P l 100,48 113,48|P c 112,94,12|P c 80,94,5|B c 99,26,7|B l 70,62 92,35|B l 92,37 100,44 106,49|B l 70,62 82,80 76,98 84,100|B l 70,62 92,70 86,92 94,94|M d M 64 106 A 16 16 0 0 0 96 106",
 "Passadeira – Aquecimento": "P l 28,104 132,104|P l 28,104 24,112|P l 132,104 136,112|P l 128,104 122,44|P l 108,44 134,44|B c 74,28,7|B l 74,36 72,68|B l 74,42 62,50 68,62|B l 74,42 90,50 98,44|B l 72,68 62,84 58,104|B l 72,68 90,84 86,96|M l 44,84 20,84",
 "Alongamento do Mundo (World's Greatest)": "B c 108,56,7|B l 72,78 100,62|B l 72,78 98,84 100,110 110,111|B l 72,78 46,102 24,106 18,110|B l 100,63 98,86 96,110|B l 100,62 99,40 97,18|M d M 116 44 Q 120 26 106 16",
 "Ponte Glúteos (Peso Corporal)": "B c 30,104,7|B l 40,108 80,90|B l 42,108 58,110 72,110|B l 80,90 106,76 116,108 126,110|A c 104,78,5|M l 84,108 84,96",
 "Ponte Glúteos Unilateral": "B c 30,104,7|B l 40,108 80,90|B l 42,108 58,110 72,110|B l 80,90 106,76 116,108 126,110|B l 80,90 132,60|M l 84,108 84,96",
 "Cat-Camel (Chão)": "B c 111,80,7|B d M56 70 Q78 50 100 70|B l 100,70 106,76|B l 100,70 100,90 101,110|B l 56,70 57,108 32,110|M d M60 80 Q78 94 96 80",
 "Bird Dog (Chão)": "B c 106,64,7|B l 56,70 98,70|B l 96,70 96,90 96,110|B l 98,70 118,68 138,66|B l 56,70 57,108 32,110|B l 56,70 36,70 14,70|M l 120,58 142,58|M l 34,60 12,60",
 "Joelhos ao Peito": "B c 80,20,7|B l 80,28 78,64|B l 80,34 66,44 72,58|B l 80,34 96,44 90,30|B l 78,64 68,80 62,110|B l 78,64 96,80 90,96|M d M 108 92 Q 116 76 104 66",
 "Agachamento (Peso Corporal)": "B c 74,30,7|B l 72,38 60,74|B l 72,42 96,50 112,50|B l 60,74 92,78 86,110 98,111|M l 40,60 40,92",
 "Agachamento Tempo 3-1-1": "B c 74,30,7|B l 72,38 60,74|B l 72,42 96,50 112,50|B l 60,74 92,78 86,110 98,111|M l 40,60 40,92",
 "Box Jump": "P r 96,70,50,42|B c 118,26,7|B l 118,34 118,52|B l 118,38 106,50|B l 118,38 130,50|B l 118,52 110,64 112,70|B l 118,52 126,64 124,70|M d M 40 100 Q 60 40 100 56",
 "Salto em Comprimento": "B c 58,26,7|B l 58,34 70,62|B l 60,40 44,50 38,60|B l 60,40 78,46 90,40|B l 70,62 60,84 72,98|B l 70,62 84,80 96,92|M d M 100 96 Q 120 60 146 96",
 "Skaters": "B c 62,28,7|B l 62,36 74,66|B l 64,42 46,50 34,56|B l 64,42 86,48 100,42|B l 74,66 84,88 86,110|B l 74,66 56,86 40,96|M d M 100 100 Q 122 86 146 100",
 "Afundo com Salto": "B c 72,26,7|B l 70,34 66,72|B l 70,40 74,72|A c 74,76,4|B l 66,72 92,84 96,110|B l 66,72 48,104 24,110|M l 120,74 120,98",
 "Goblet Squat (Halter)": "B c 80,24,7|B l 79,32 66,76|B l 78,36 84,58 90,50|A r 86,40,8,16|B l 66,76 98,80 90,110 102,111|M l 50,62 50,94",
 "Flexões (Padrão)": "B c 26,72,7|B l 36,78 92,84 142,110|B l 38,80 42,110|M l 70,104 70,92",
 "Flexões em Incline": "B c 26,72,7|B l 36,78 92,84 142,110|B l 38,80 42,110|M l 70,104 70,92",
 "Remada Baixa Sentada": "P l 122,94 124,112|P c 132,104,3|P l 66,88 130,104|B c 60,55,7|B l 58,63 54,106|B l 58,66 44,84 66,88|A f 66,88,3|B l 54,106 84,96 116,104 122,96|M l 104,82 82,82",
 "Stepup (Banco + Halteres)": "P l 100,72 146,72|P l 106,72 106,112|P l 140,72 140,112|B c 76,24,7|B l 76,32 74,68|B l 76,38 80,70|A c 80,74,4|B l 74,68 96,62 114,72|B l 74,68 68,90 64,110|M l 126,60 126,36",
 "Puxada Alta (Barra Larga)": "P r 120,6,18,106|P l 100,8 120,8|P c 100,8,3|P l 60,80 86,80|P l 72,80 72,112|P c 92,70,5|P l 84,40 100,11|B c 77,31,7|B l 75,39 70,76|B l 75,42 74,58 84,40|A f 84,40,3|B l 70,76 94,78 96,110 104,111|M l 92,14 92,32",
 "Puxada Pega Fechada (Supinada)": "P r 120,6,18,106|P l 100,8 120,8|P c 100,8,3|P l 60,80 86,80|P l 72,80 72,112|P c 92,70,5|P l 84,40 100,11|B c 77,31,7|B l 75,39 70,76|B l 75,42 74,58 84,40|A f 84,40,3|B l 70,76 94,78 96,110 104,111|M l 92,14 92,32",
 "Hip Thrust (Barra)": "P r 18,80,36,9|P l 24,89 24,112|P l 48,89 48,112|B c 40,70,7|B l 48,76 88,70|B l 52,76 68,82 84,72|A c 86,62,11|A f 86,62,2.5|B l 88,70 114,72 114,110 124,111|M l 100,104 100,84",
 "Shoulder Press (Máquina)": "P l 50,76 52,28|P l 48,76 84,76|P l 66,76 66,112|B c 58,24,7|B l 60,32 62,72|B l 62,36 74,24 74,10|A r 66,4,16,6|B l 62,72 88,74 90,110 98,111|M l 92,34 92,12",
 "Pallof Press (Polia)": "P l 20,6 20,112|A l 20,44 88,44|B c 88,20,7|B l 88,28 88,64|B l 74,34 102,34|B l 74,34 80,42 88,44|B l 102,34 96,42 88,44|A f 88,44,3|B l 80,64 96,64|B l 80,64 76,88 72,110|B l 96,64 100,88 104,110|M l 60,54 36,54",
 "Prancha Lateral (Cada lado)": "B c 36,80,7|B l 46,88 88,98 132,110|B l 46,88 46,110 66,110|B l 46,88 62,78 84,94|M l 92,112 92,100",
 "Prancha (Frontal)": "B c 26,72,7|B l 36,78 92,84 142,110|B l 38,80 36,104|B l 24,110 50,110|A l 36,80 92,86",
 "Dead Bug (Chão)": "B c 24,100,7|B l 34,104 74,104|B l 36,104 36,84 36,66|B l 36,104 20,106 6,106|B l 74,104 74,80 96,80 100,76|B l 74,104 100,98 126,94 130,90|M d M 108 84 Q 120 88 124 98",
 "Hamstring Walkout": "B c 30,104,7|B l 40,108 80,90|B l 42,108 58,110 72,110|B l 80,90 112,84 132,108 140,110|M l 118,100 142,100",
 "Hollow Hold": "B c 22,90,7|B l 32,98 80,104 130,92|B l 30,98 12,84|A l 40,104 100,104|M l 130,100 130,88",
 "Superman": "B c 22,88,7|B l 30,94 80,102 130,96|B l 28,92 8,84|B l 80,102 106,96 132,90|M l 16,78 16,68|M l 138,84 138,74",
 "Clamshell c/ Mini Band": "B c 22,88,7|B l 32,92 84,96|B l 84,96 110,88 130,104|B l 84,96 104,70 130,104|A l 108,72 110,86|B l 34,92 26,76|M d M 116 84 Q 122 70 112 62",
 "Leg Press (Máquina)": "P l 22,50 40,96|P l 40,96 70,92|B c 32,40,7|B l 38,48 56,88|B l 40,54 50,72|B l 56,88 86,64 110,58|P l 104,44 120,78|P l 118,78 140,110|A c 110,58,3|M l 84,86 106,72",
 "Supino c/ Halteres": "P l 24,82 112,82|P l 40,82 40,112|P l 96,82 96,112|B c 30,74,7|B l 38,78 86,78|B l 44,78 48,60 50,44|A r 42,38,16,6|B l 86,78 110,74 116,110|M l 72,62 72,38",
 "Supino Inclinado (Halteres)": "P l 24,82 112,82|P l 40,82 40,112|P l 96,82 96,112|B c 30,74,7|B l 38,78 86,78|B l 44,78 48,60 50,44|A r 42,38,16,6|B l 86,78 110,74 116,110|M l 72,62 72,38",
 "Leg Curl Deitada (Máquina)": "P l 30,84 130,84|P l 36,84 36,112|P l 124,84 124,112|B c 30,74,7|B l 40,80 90,82|B l 90,82 110,84 126,62|A c 130,60,5|M d M 134 90 Q 144 76 134 66",
 "Leg Curl Sentada (Máquina)": "P l 40,44 46,84|P l 46,84 84,84|P l 60,84 60,112|B c 52,36,7|B l 54,44 60,82|P l 64,74 92,74|B l 60,82 94,82 118,100|A c 118,104,5|M d M 124 68 Q 134 84 122 100",
 "Remada c/ Apoio ao Peito (Máquina)": "P l 122,94 124,112|P c 132,104,3|P l 66,88 130,104|B c 60,55,7|B l 58,63 54,106|B l 58,66 44,84 66,88|A f 66,88,3|B l 54,106 84,96 116,104 122,96|M l 104,82 82,82",
 "Remada com Halteres (Unilateral)": "P l 40,78 96,78|P l 46,78 46,112|P l 90,78 90,112|B c 106,50,7|B l 98,52 58,56|B l 96,54 96,66 96,78|B l 58,56 60,78 40,78|B l 58,56 54,84 52,110 60,111|B l 92,52 78,40 80,62|A c 80,65,4.5|M l 70,100 70,74",
 "Remada Invertida (Mesa)": "P l 20,50 140,50|P l 26,50 26,112|P l 134,50 134,112|B c 40,80,7|B l 48,84 96,96 128,110|B l 48,84 46,66 44,52|A f 44,52,3|M l 72,102 72,90",
 "Afundo Inverso": "B c 72,26,7|B l 70,34 66,72|B l 70,40 74,72|A c 74,76,4|B l 66,72 92,84 96,110|B l 66,72 48,104 24,110|M l 120,74 120,98",
 "Afundo Búlgaro (Banco + Halter)": "P l 20,78 50,78|P l 26,78 26,112|P l 46,78 46,112|B c 78,23,7|B l 76,31 72,70|B l 76,35 77,52 78,68|A c 78,72,4.5|B l 72,70 100,84 98,110 108,111|B l 72,70 60,100 44,82 38,78|M l 124,70 124,96",
 "Afundo Caminhando (Halteres)": "B c 72,26,7|B l 70,34 66,72|B l 70,40 74,72|A c 74,76,4|B l 66,72 92,84 96,110|B l 66,72 48,104 24,110|M l 120,74 120,98",
 "Face Pull (Polia)": "P r 122,6,18,106|P c 122,24,3|P l 76,24 122,24|B c 72,23,7|B l 70,31 70,62|B l 70,35 56,30 76,24|A f 76,24,3|B l 70,62 74,86 76,110 84,111|B l 70,62 64,86 58,110 66,111|M l 112,16 90,16",
 "Elevação Lateral (Halteres)": "B c 80,20,7|B l 80,28 80,64|B l 80,34 70,50 66,70|B l 80,34 104,38 124,36|A c 128,36,4|B l 80,64 72,88 68,110|B l 80,64 88,88 92,110|M d M 116 66 Q 132 60 130 44",
 "Monster Walk (c/ Elástico nos joelhos)": "B c 80,22,7|B l 80,30 80,62|B l 70,36 90,36|B l 70,36 64,50 72,60|B l 90,36 96,50 88,60|B l 72,64 88,64|B l 72,64 64,88 58,110|B l 88,64 98,88 104,110|A l 64,88 98,88|M l 114,102 136,102",
 "Mountain Climbers": "B c 26,72,7|B l 36,78 92,84 142,110|B l 38,80 42,110|B l 92,84 66,96 58,110|M l 106,102 74,96",
 "Corda de Saltar": "B c 80,22,7|B l 80,30 80,64|B l 80,36 68,50 62,60|B l 80,36 92,50 98,60|B l 80,64 72,86 70,104|B l 80,64 88,86 90,104|P d M 62 60 Q 80 128 98 60|P d M 62 60 Q 80 2 98 60|M l 120,100 120,80",
 "Polichinelos": "B c 80,20,7|B l 80,28 80,66|B l 80,34 60,20 48,8|B l 80,34 100,20 112,8|B l 80,66 62,90 52,110|B l 80,66 98,90 108,110|M d M 40 40 Q 30 60 44 80|M d M 120 40 Q 130 60 116 80",
 "Alongamento Flexores da Anca": "B c 70,31,7|B l 70,39 72,76|B l 70,42 62,58 72,72|B l 72,76 96,76 98,110 108,111|B l 72,76 58,108 34,110 30,108|M l 60,86 84,86",
 "Alongamento Posteriores (Hamstrings)": "P l 100,78 140,78|P l 106,78 106,112|P l 134,78 134,112|B c 91,33,7|B l 84,38 60,62|B l 83,40 88,54 94,66|B l 60,62 60,86 58,110 66,111|B l 60,62 84,70 106,76 108,70|M d M 66 28 Q 78 20 88 22",
 "Alongamento Gémeos (Parede)": "P l 20,6 20,112|B c 54,24,7|B l 54,32 62,66|B l 52,36 36,50 22,54|B l 62,66 58,88 54,110|B l 62,66 92,90 118,110|A c 118,110,3",
 "Alongamento Quadricípite (De Pé)": "B c 74,20,7|B l 74,28 74,66|B l 74,34 60,40 52,50|B l 74,34 86,50 98,86|B l 74,66 70,88 68,110|B l 74,66 88,82 98,90|A c 98,90,4",
 "Alongamento Glúteo (Figura 4)": "B c 22,100,7|B l 32,104 72,104|B l 72,104 68,80 92,72|B l 72,104 96,96 72,82|B l 34,104 50,92 64,86|M l 92,62 76,54",
 "Alongamento Peitoral (Porta)": "P l 36,6 36,112|B c 64,23,7|B l 62,31 62,62|B l 62,35 42,36 40,18|B l 62,62 64,86 64,110 72,111|B l 62,62 58,86 54,110 62,111|M d M 74 48 Q 86 40 92 50",
 "Alongamento Tríceps e Ombro": "B c 80,22,7|B l 80,30 80,66|B l 80,36 70,18 84,10|B l 80,36 96,30 74,16|A c 74,16,3|B l 80,66 72,88 68,110|B l 80,66 88,88 92,110",
 "Extensão de Pernas (Máquina)": "P l 50,72 86,72|P l 50,72 46,30|P l 66,72 66,112|B c 56,25,7|B l 54,33 62,68|B l 55,36 58,52 70,66|B l 62,68 86,70 118,68 124,62|A c 118,76,5|M d M 92 104 Q 114 100 118 86",
 "Abdutora (Máquina)": "P l 60,66 100,66|P l 80,66 80,112|B c 80,26,7|B l 80,34 80,66|B l 76,40 64,56|B l 84,40 96,56|B l 80,66 58,84 56,110|B l 80,66 102,84 104,110|A r 42,78,6,14|A r 112,78,6,14|M l 40,100 26,100|M l 120,100 134,100",
 "Adutora (Máquina)": "P l 60,66 100,66|P l 80,66 80,112|B c 80,26,7|B l 80,34 80,66|B l 76,40 64,56|B l 84,40 96,56|B l 80,66 54,84 50,110|B l 80,66 106,84 110,110|A r 60,78,6,14|A r 94,78,6,14|M l 36,100 50,100|M l 124,100 110,100",
 "Kettlebell Swing": "B c 70,34,7|B l 66,42 44,72|B l 66,44 88,48 110,52|A c 116,54,7|B l 44,72 54,92 52,110|B l 44,72 62,90 66,110|M d M 100 84 Q 122 70 118 44",
 "Abdução de Anca Deitada": "B c 22,90,7|B l 32,94 84,98|B l 84,98 136,104|B l 84,98 132,66|B l 34,94 26,78|M d M 136 96 Q 146 84 136 72",
 "Farmer's Carry (Halteres)": "B c 80,20,7|B l 80,28 80,64|B l 70,34 66,72|B l 90,34 94,72|A r 60,70,12,6|A r 88,70,12,6|B l 72,64 88,64|B l 72,64 62,88 56,110|B l 88,64 96,88 100,110|M l 120,100 142,100",
 "Russian Twist": "B c 56,44,7|B l 60,52 84,96|B l 62,60 40,70 30,80|A c 28,82,4|B l 84,96 110,76 126,100|M d M 30 90 Q 44 102 62 96",
 "V-Up": "B c 44,62,7|B l 50,70 80,104 116,66|B l 52,72 98,74|M l 30,96 44,80|M l 130,96 116,80",
 "Bicicleta (Abdominal)": "B c 28,88,7|B l 36,92 84,100|B l 84,100 76,76 66,66|B l 84,100 134,90|B l 38,90 58,80 74,78|M l 118,86 132,74",
 "Marcha no Lugar": "B c 80,20,7|B l 80,28 78,64|B l 80,34 66,44 72,58|B l 80,34 96,44 90,30|B l 78,64 68,80 62,110|B l 78,64 96,80 90,96|M d M 108 92 Q 116 76 104 66",
 "Corrida no Lugar": "B c 80,20,7|B l 80,28 78,64|B l 80,34 66,44 72,58|B l 80,34 96,44 90,30|B l 78,64 68,80 62,110|B l 78,64 96,80 90,96|M d M 108 92 Q 116 76 104 66",
 "Burpees": "B c 80,18,7|B l 80,26 80,58|B l 80,30 68,14 66,4|B l 80,30 92,14 94,4|B l 80,58 72,80 70,100|B l 80,58 88,80 90,100|P l 66,110 92,110|M l 116,104 116,64|P l 8,108 40,112|P c 6,104,3",
 "Woodchop (Polia)": "P r 14,6,16,106|P c 30,12,3|P l 30,12 128,80|B c 96,20,7|B l 94,28 90,64|B l 86,34 126,80|B l 100,32 130,78|A f 128,80,3|B l 82,64 98,64|B l 82,64 76,88 70,110|B l 98,64 104,88 110,110|M d M 70 20 Q 112 24 124 70|M d M 78 72 A 12 4 0 0 0 102 72",
 "Deadlift (Barra)": "B c 106,42,7|B l 98,48 66,70|B l 97,50 97,72 96,94|A c 94,100,12|A f 94,100,2.5|B l 66,70 98,88 92,110 102,111|M l 134,100 134,62",
 "RDL (Barra)": "B c 108,46,7|B l 100,52 62,66|B l 99,54 98,70 97,84|A c 97,87,11|A f 97,87,2.5|B l 62,66 88,86 86,110 96,111|M l 56,54 38,54"
};
var FEEL = {
 "Bicicleta Estática – Aquecimento": [
  "A respiração a subir aos poucos e o corpo a aquecer — consegues falar.",
  "Começar forte: isto é aquecimento, não treino."
 ],
 "Passadeira – Aquecimento": [
  "A respiração a subir aos poucos.",
  "Começar a correr forte."
 ],
 "Alongamento do Mundo (World's Greatest)": [
  "A frente da anca de trás a abrir e o meio das costas a rodar quando levas o braço ao teto.",
  "Rodar só o braço: segue a mão com o olhar e roda o peito."
 ],
 "Ponte Glúteos Unilateral": [
  "O glúteo da perna de apoio a apertar.",
  "A anca a cair para o lado da perna no ar."
 ],
 "Cat-Camel (Chão)": [
  "A coluna a mexer vértebra a vértebra, do pescoço ao cóccix.",
  "Forçar os extremos — é movimento suave, não alongamento."
 ],
 "Bird Dog (Chão)": [
  "Glúteo e costas a estabilizar, como se tivesses um copo nas costas.",
  "Rodar a bacia ao esticar a perna."
 ],
 "Joelhos ao Peito": [
  "Coração a subir, joelhos altos.",
  "Inclinar o tronco para trás."
 ],
 "Agachamento (Peso Corporal)": [
  "Coxas e glúteos, peso no meio do pé.",
  "Joelhos a cair para dentro."
 ],
 "Agachamento Tempo 3-1-1": [
  "As coxas a arder na descida lenta.",
  "Acelerar a descida."
 ],
 "Box Jump": [
  "Aterragem suave, joelhos por cima dos pés.",
  "Saltar da caixa para baixo."
 ],
 "Salto em Comprimento": [
  "A anca a explodir para a frente, aterragem suave.",
  "Aterrar de pernas esticadas."
 ],
 "Skaters": [
  "Glúteo da perna de aterragem a segurar.",
  "Aterrar de joelho para dentro."
 ],
 "Afundo com Salto": [
  "Explosão para cima e aterragem suave em afundo.",
  "Joelho da frente a cair para dentro."
 ],
 "Goblet Squat (Halter)": [
  "Tronco direito e cotovelos por dentro dos joelhos no fundo.",
  "Arredondar as costas para descer mais."
 ],
 "Flexões (Padrão)": [
  "Peito, tríceps e core a segurar o corpo reto.",
  "A anca a cair ou a subir."
 ],
 "Flexões em Incline": [
  "Peito e tríceps, corpo reto.",
  "Anca a cair."
 ],
 "Remada Baixa Sentada": [
  "As omoplatas a juntar no fim e o meio das costas a trabalhar.",
  "Balançar o tronco para trás para ganhar embalo."
 ],
 "Stepup (Banco + Halteres)": [
  "O glúteo da perna de cima a puxar-te.",
  "Saltar com a perna de baixo."
 ],
 "Puxada Alta (Barra Larga)": [
  "As costas laterais a levar os cotovelos para os bolsos de trás.",
  "Inclinar muito para trás e puxar só com os braços."
 ],
 "Puxada Pega Fechada (Supinada)": [
  "A parte de baixo das costas e o bíceps; o peito sobe ao encontro da barra.",
  "Encolher os ombros para as orelhas."
 ],
 "Hip Thrust (Barra)": [
  "Glúteos a apertar no topo, queixo ao peito, costelas para baixo.",
  "Subir com a lombar em arco em vez de ser a anca a subir."
 ],
 "Shoulder Press (Máquina)": [
  "Os ombros a empurrar com o abdómen firme.",
  "Arquear a lombar para ajudar."
 ],
 "Pallof Press (Polia)": [
  "O core todo a resistir à rotação.",
  "Deixar o tronco rodar para a polia."
 ],
 "Prancha Lateral (Cada lado)": [
  "O lado do tronco e o glúteo a segurar a anca alta.",
  "A anca a cair ou a rodar para a frente."
 ],
 "Prancha (Frontal)": [
  "Abdómen e glúteo apertados, corpo reto.",
  "A anca a cair ou a lombar a arquear."
 ],
 "Dead Bug (Chão)": [
  "O abdómen a manter a lombar colada ao chão enquanto braços e pernas se mexem.",
  "A lombar a descolar — se acontecer, reduz a amplitude."
 ],
 "Hamstring Walkout": [
  "Atrás das coxas a trabalhar para segurar a anca.",
  "Deixar a anca cair."
 ],
 "Hollow Hold": [
  "O abdómen a manter a lombar colada ao chão.",
  "A lombar a descolar — dobra os joelhos."
 ],
 "Superman": [
  "Lombar e glúteos a levantar.",
  "Forçar o pescoço para cima."
 ],
 "Clamshell c/ Mini Band": [
  "O lado do glúteo a arder.",
  "Rodar a bacia para trás."
 ],
 "Leg Press (Máquina)": [
  "Coxas e glúteos a empurrar, lombar sempre colada ao encosto.",
  "Bloquear os joelhos em cima ou deixar a anca enrolar em baixo."
 ],
 "Supino c/ Halteres": [
  "Peito e tríceps a empurrar, omoplatas presas ao banco.",
  "Deixar os halteres descer sem controlo."
 ],
 "Supino Inclinado (Halteres)": [
  "A parte de cima do peito a trabalhar.",
  "Cotovelos demasiado abertos."
 ],
 "Leg Curl Deitada (Máquina)": [
  "Atrás da coxa a contrair quando os calcanhares sobem.",
  "A anca a levantar do banco."
 ],
 "Leg Curl Sentada (Máquina)": [
  "Atrás da coxa a apertar no fim.",
  "Deixar o peso puxar as pernas de volta sem controlo."
 ],
 "Remada c/ Apoio ao Peito (Máquina)": [
  "O meio das costas, sem o tronco ajudar.",
  "Encolher os ombros."
 ],
 "Remada com Halteres (Unilateral)": [
  "As costas a puxar o cotovelo para trás, junto ao corpo.",
  "Rodar o tronco para subir o halter."
 ],
 "Remada Invertida (Mesa)": [
  "As costas a puxar o peito à mesa, corpo reto.",
  "A anca a cair."
 ],
 "Afundo Inverso": [
  "Glúteo e coxa da perna da frente ao subir.",
  "Joelho da frente a passar muito a ponta do pé."
 ],
 "Afundo Búlgaro (Banco + Halter)": [
  "Glúteo e coxa da perna da frente; a de trás só apoia.",
  "O joelho da frente a cair para dentro."
 ],
 "Afundo Caminhando (Halteres)": [
  "Glúteo e coxa da perna da frente a empurrar.",
  "Joelho da frente a cair para dentro."
 ],
 "Face Pull (Polia)": [
  "A parte de trás dos ombros e o meio das costas.",
  "Carga pesada — é saúde de ombro."
 ],
 "Elevação Lateral (Halteres)": [
  "O lado do ombro a trabalhar.",
  "Encolher o trapézio ou balançar."
 ],
 "Monster Walk (c/ Elástico nos joelhos)": [
  "O lado da anca (glúteo médio) a arder.",
  "Os joelhos a fechar ou o tronco a balançar."
 ],
 "Mountain Climbers": [
  "O core a segurar a anca enquanto as pernas correm.",
  "A anca a subir para o teto."
 ],
 "Corda de Saltar": [
  "Saltos pequenos e rápidos, pulsos a rodar.",
  "Saltar demasiado alto."
 ],
 "Polichinelos": [
  "Ritmo e respiração a subir.",
  "Aterrar com os joelhos esticados."
 ],
 "Alongamento Flexores da Anca": [
  "A frente da anca da perna de trás a esticar.",
  "Arquear a lombar em vez de apertar o glúteo."
 ],
 "Alongamento Posteriores (Hamstrings)": [
  "Atrás da coxa da perna esticada.",
  "Arredondar as costas para chegar mais longe."
 ],
 "Alongamento Gémeos (Parede)": [
  "A barriga da perna de trás.",
  "Levantar o calcanhar."
 ],
 "Alongamento Quadricípite (De Pé)": [
  "A frente da coxa a esticar.",
  "Arquear a lombar."
 ],
 "Alongamento Glúteo (Figura 4)": [
  "O glúteo da perna cruzada.",
  "Levantar a cabeça e tensionar o pescoço."
 ],
 "Alongamento Peitoral (Porta)": [
  "O peito e a frente do ombro a abrir.",
  "Forçar até doer no ombro."
 ],
 "Alongamento Tríceps e Ombro": [
  "A parte de trás do braço e o ombro.",
  "Puxar com força."
 ],
 "Extensão de Pernas (Máquina)": [
  "A frente da coxa a queimar no topo — aguenta 1s.",
  "Deixar o peso cair na descida."
 ],
 "Abdutora (Máquina)": [
  "O lado da anca (glúteo médio) a arder.",
  "Fechar as pernas de repente."
 ],
 "Adutora (Máquina)": [
  "O interior das coxas a apertar.",
  "Abrir demasiado e forçar a virilha."
 ],
 "Kettlebell Swing": [
  "A anca a estalar para a frente e os glúteos a apertar no topo.",
  "Fazer squat ou levantar o KB com os braços."
 ],
 "Abdução de Anca Deitada": [
  "O lado da anca a trabalhar.",
  "Rodar o pé para cima."
 ],
 "Farmer's Carry (Halteres)": [
  "Core e ombros a segurar tudo direito.",
  "Inclinar para um lado ou encolher os ombros."
 ],
 "Russian Twist": [
  "Os oblíquos a rodar o tronco.",
  "Rodar só os braços."
 ],
 "V-Up": [
  "O abdómen a juntar tronco e pernas.",
  "Usar o embalo dos braços."
 ],
 "Bicicleta (Abdominal)": [
  "Oblíquos e abdómen, ritmo controlado.",
  "Puxar pelo pescoço."
 ],
 "Marcha no Lugar": [
  "Corpo a aquecer.",
  "Começar depressa."
 ],
 "Corrida no Lugar": [
  "Coração a subir.",
  "Bater com os pés no chão."
 ],
 "Burpees": [
  "O corpo todo, ritmo constante.",
  "Arredondar a lombar ao ir ao chão."
 ],
 "Woodchop (Polia)": [
  "Os oblíquos e a anca a rodar juntos.",
  "Puxar só com os braços."
 ],
 "Deadlift (Barra)": [
  "Tensão nos posteriores e glúteos antes de a barra sair do chão; costas firmes.",
  "Costas a arredondar ou a barra a afastar-se das pernas."
 ],
 "RDL (Barra)": [
  "Alongamento forte atrás das coxas na descida; glúteos a fechar a anca na subida.",
  "Dobrar demasiado os joelhos e transformar em squat."
 ]
};
var EX_EN = {
 "Bicicleta Estática – Aquecimento": "Stationary Bike Warm-Up",
 "Passadeira – Aquecimento": "Treadmill Warm-Up",
 "Alongamento do Mundo (World's Greatest)": "World's Greatest Stretch",
 "Ponte Glúteos (Peso Corporal)": "Glute Bridge",
 "Ponte Glúteos Unilateral": "Single-Leg Glute Bridge",
 "Cat-Camel (Chão)": "Cat-Cow",
 "Bird Dog (Chão)": "Bird Dog",
 "Joelhos ao Peito": "High Knees",
 "Agachamento (Peso Corporal)": "Air Squat",
 "Agachamento Tempo 3-1-1": "Tempo Squat",
 "Box Jump": "Box Jump",
 "Salto em Comprimento": "Broad Jump",
 "Skaters": "Skater Jumps",
 "Afundo com Salto": "Jump Lunge",
 "Goblet Squat (Halter)": "Goblet Squat",
 "Flexões (Padrão)": "Push-Up",
 "Flexões em Incline": "Incline Push-Up",
 "Remada Baixa Sentada": "Seated Cable Row",
 "Stepup (Banco + Halteres)": "Dumbbell Step-Up",
 "Puxada Alta (Barra Larga)": "Wide-Grip Lat Pulldown",
 "Puxada Pega Fechada (Supinada)": "Close-Grip Underhand Lat Pulldown",
 "Hip Thrust (Barra)": "Barbell Hip Thrust",
 "Shoulder Press (Máquina)": "Machine Shoulder Press",
 "Pallof Press (Polia)": "Pallof Press",
 "Prancha Lateral (Cada lado)": "Side Plank",
 "Prancha (Frontal)": "Plank",
 "Dead Bug (Chão)": "Dead Bug",
 "Hamstring Walkout": "Hamstring Walkout",
 "Hollow Hold": "Hollow Hold",
 "Superman": "Superman",
 "Clamshell c/ Mini Band": "Banded Clamshell",
 "Leg Press (Máquina)": "Leg Press",
 "Supino c/ Halteres": "Dumbbell Bench Press",
 "Supino Inclinado (Halteres)": "Incline Dumbbell Bench Press",
 "Leg Curl Deitada (Máquina)": "Lying Leg Curl",
 "Leg Curl Sentada (Máquina)": "Seated Leg Curl",
 "Remada c/ Apoio ao Peito (Máquina)": "Chest-Supported Row",
 "Remada com Halteres (Unilateral)": "Single-Arm Dumbbell Row",
 "Remada Invertida (Mesa)": "Inverted Row",
 "Afundo Inverso": "Reverse Lunge",
 "Afundo Búlgaro (Banco + Halter)": "Bulgarian Split Squat",
 "Afundo Caminhando (Halteres)": "Walking Lunge",
 "Face Pull (Polia)": "Cable Face Pull",
 "Elevação Lateral (Halteres)": "Dumbbell Lateral Raise",
 "Monster Walk (c/ Elástico nos joelhos)": "Monster Walk",
 "Mountain Climbers": "Mountain Climbers",
 "Corda de Saltar": "Jump Rope",
 "Polichinelos": "Jumping Jacks",
 "Alongamento Flexores da Anca": "Half-Kneeling Hip Flexor Stretch",
 "Alongamento Posteriores (Hamstrings)": "Standing Hamstring Stretch",
 "Alongamento Gémeos (Parede)": "Calf Stretch",
 "Alongamento Quadricípite (De Pé)": "Standing Quad Stretch",
 "Alongamento Glúteo (Figura 4)": "Figure-4 Glute Stretch",
 "Alongamento Peitoral (Porta)": "Doorway Chest Stretch",
 "Alongamento Tríceps e Ombro": "Overhead Tricep Stretch",
 "Extensão de Pernas (Máquina)": "Leg Extension",
 "Abdutora (Máquina)": "Hip Abduction Machine",
 "Adutora (Máquina)": "Hip Adduction Machine",
 "Kettlebell Swing": "Kettlebell Swing",
 "Abdução de Anca Deitada": "Side-Lying Leg Raise",
 "Farmer's Carry (Halteres)": "Farmer's Carry",
 "Russian Twist": "Russian Twist",
 "V-Up": "V-Up",
 "Bicicleta (Abdominal)": "Bicycle Crunch",
 "Marcha no Lugar": "March in Place",
 "Corrida no Lugar": "Run in Place",
 "Burpees": "Burpees",
 "Woodchop (Polia)": "Cable Woodchop",
 "Deadlift (Barra)": "Deadlift",
 "RDL (Barra)": "Romanian Deadlift (RDL)"
};
