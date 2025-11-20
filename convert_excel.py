#!/usr/bin/env python3
import pandas as pd
import json

def convert_excel_to_js():
    # Ler o arquivo Excel
    excel_file = 'treinor.xlsx'
    df = pd.read_excel(excel_file)
    
    workout_data = {}
    current_day = None
    
    for index, row in df.iterrows():
        dia = str(row['DIA']).strip()
        
        # Se é um cabeçalho de dia (ex: "DIA 1", "DIA 2")
        if dia.startswith('DIA '):
            current_day = dia.replace('DIA ', '')
            workout_data[current_day] = {
                "name": dia,
                "exercises": []
            }
            continue
        
        # Se é um número (exercício do dia atual)
        if current_day and dia.isdigit():
            series = str(row['SÉRIES']) if not pd.isna(row['SÉRIES']) else ""
            reps = str(row['REPETIÇÕES']) if not pd.isna(row['REPETIÇÕES']) else ""
            
            # Formatar séries x repetições
            if series and reps:
                sets_formatted = f"{series}x{reps}"
            elif series:
                sets_formatted = series
            else:
                sets_formatted = ""
            
            exercise = {
                "name": str(row['EXERCÍCIO']) if not pd.isna(row['EXERCÍCIO']) else "",
                "sets": sets_formatted,
                "rest": str(row['PAUSA']) if not pd.isna(row['PAUSA']) else "",
                "details": str(row['OBSERVAÇÕES / DICAS']) if not pd.isna(row['OBSERVAÇÕES / DICAS']) else "",
                "video": str(row['LINK']) if not pd.isna(row['LINK']) else ""
            }
            
            workout_data[current_day]["exercises"].append(exercise)
    
    # Salvar como arquivo JavaScript
    js_content = f"// Dados dos treinos embutidos no JavaScript\nconst WORKOUT_DATA = {json.dumps(workout_data, ensure_ascii=False, indent=2)};"
    
    with open('workout-data.js', 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    print(f"✅ Convertido com sucesso! {len(workout_data)} treinos encontrados.")
    for day, data in workout_data.items():
        print(f"   Dia {day}: {data['name']} - {len(data['exercises'])} exercícios")

if __name__ == "__main__":
    convert_excel_to_js()
